import React, { useCallback, useEffect, useState } from 'react'
import {CirclePlus, Pencil, Trash2, Archive} from "lucide-react";
import { suggestTitle, correctNotes } from '../utils/gptHelper';
import ToggleSwitch from '../components/ToggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import "../App.css"
import type { Note } from '../types';
import { type RootState, type AppDispatch } from '../store';
import {  saveNote, clearNote, todaysNotes, allNotes } from '../redux/reducers/noteSlice';
import { thisWeekNotes, thisMonthNotes } from '../redux/reducers/noteSlice';
import Tabs from '../components/Tabs';
import Notes from '../components/Notes';

  const colors = [
    "#FDDDE6",
    "#F9EBF7",
    "#F0FFF0",
    "#FFE5B4",
    "#FFF9C4"
  ]
  
const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({title: "", notes: ""});
  const [nextId, setNextId] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [correctedData, setCorrectedData] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [errors, setErrors] = useState({title: "", notes: ""})

  const notes = useSelector((state: RootState) => state.notes);
  const editableNote = useSelector((state: RootState) => state.editableNote)
  const dispatch = useDispatch<AppDispatch>();
  const thisWeeknotes = useSelector(thisWeekNotes);
  const todaysnotes = useSelector(todaysNotes);
  const thismonthNotes = useSelector(thisMonthNotes);
  const allnotes = useSelector(allNotes)

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  },[])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  },[])


  const handleSave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    let hasError = false;
    const newErrors: { title: string; notes: string } = {title: "", notes: ""};
  
    if (formData.title.trim() === "") {
      newErrors.title = "Title is required";
      hasError = true;
    }
  
    if (formData.notes.trim() === "") {
      newErrors.notes = "Notes is required";
      hasError = true;
    }
  
    if (hasError) {
      setErrors(newErrors);
      return;
    }
  
    if (editableNote) {
      const updatedNote: Note = {
        id: editableNote.id,
        date: editableNote.date,
        title: formData.title,
        notes: formData.notes,
        updated_Date: new Date().toLocaleString(),
        color: editableNote.color, 
        archived: editableNote.archived
      };
  
      dispatch(saveNote(updatedNote));
      dispatch(clearNote());
    } else {
      const newNote: Note = {
        id: nextId,
        date: new Date().toLocaleDateString(),
        title: formData.title,
        notes: formData.notes,
        updated_Date: new Date().toLocaleString(),
        color: randomColor,
        archived: false
      };
  
      dispatch(saveNote(newNote));
      setNextId(nextId + 1);
    }
  
    setFormData({ title: "", notes: "" });
    setErrors({title: "", notes: ""});
    setIsModalOpen(false);
  
  }, [dispatch, editableNote, formData, nextId]);
  
  
  const handleChange = useCallback((e :  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    if(formData.notes !== ""){
        setErrors({...errors, notes: "Notes is required"})
    }
    setFormData({...formData, [name]: value})
  },[formData])

  const handleSuggestTitle = async() => {
        const suggestedTitle = await suggestTitle(formData.notes);
        setFormData(prev => ({...prev, title: suggestedTitle}))
  }

  const handleToggleChange = (value: boolean) => {
    setIsToggled(value);
    if(value){
        handleSuggestTitle();
    }
   }


  const handleClickNoteSuggest = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(formData.notes !== ""){
    setShowSuggestions(true)
    const corrected = await correctNotes(formData.notes)
    setCorrectedData(corrected);
    }
  }

  const handleUseThisSuggestion =() => {
    setFormData(prev => ({...prev, notes: correctedData}))
    setShowSuggestions(false);
  }

  const handleCancel = () => {
    setFormData({title:"", notes:""});
    setShowSuggestions(false);
    closeModal();
  }

  return (
    <div>
        <button onClick={openModal} className='border-black border flex flex-row items-center gap-2 rounded-md p-2 mt-5'>
            <CirclePlus size={20}/>
            New Note
        </button>
        <Tabs tabs={[
            {name: "Today", content: <Notes notes={todaysnotes} setFormData={setFormData} setIsModalOpen={setIsModalOpen}/>}, 
            {name: "This week", content: <Notes notes={thisWeeknotes} setFormData={setFormData} setIsModalOpen={setIsModalOpen}/>}, 
            {name: "This month", content: <Notes notes={thismonthNotes} setFormData={setFormData} setIsModalOpen={setIsModalOpen}/>}, 
            {name: "All", content: <Notes notes={allnotes} setFormData={setFormData} setIsModalOpen={setIsModalOpen}/>}]} />
      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()} style={{minWidth: "50%"}}>
                <div className='flex flex-row w-full items-center justify-end'>
                <p>Use AI suggested title</p>
                <ToggleSwitch onToggle={handleToggleChange} isBlocked={formData.notes === ""}/>
                </div>
                <form className='p-2'>
                <div className='flex flex-col gap-2'>
                    <label>Title</label>
                    <input 
                    value={formData.title}
                    name="title"
                    type="text" className='border rounded-md p-2' onChange={handleChange}></input>
                    {errors.title && <p className='text-red-500 text-sm'>*{errors.title}</p>}
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                  <div className='flex flex-row justify-between items-center'>
                    <label>Notes</label>
                    <button className='bg-gray-300 text-sm rounded-md p-2' type='submit' onClick={handleClickNoteSuggest} disabled={formData.notes===""}>show AI suggestions</button>
                  </div>
                  <textarea 
                  spellCheck={true}
                  name="notes"
                  value={formData.notes}
                  className='border rounded-md p-2 h-30' onChange={handleChange}></textarea>
                  {errors.notes && <p className='text-red-500 text-sm'>*{errors.notes}</p>}
                </div>
                
                <div className='flex flex-row gap-5 items-center mt-5'>
                <button className='bg-gray-300 rounded-md p-2 text-sm' onClick={handleSave} type='submit'>Save</button>
                <button className='bg-gray-300 rounded-md p-2 text-sm' onClick={handleCancel}>Cancel</button>
                </div>
                </form>
            </div>
            {showSuggestions &&
            <div className='modal-content' onClick={(e) => e.stopPropagation()} style={{width: "25%"}}>
                <div className='flex flex-row w-full justify-between items-center'>
                    <h1 className='text-2xl font-semibold'>Suggestions</h1>
                    <button className='bg-gray-300 p-2 rounded-md text-sm' onClick={handleUseThisSuggestion}>use this</button>
                </div>
                <p className='mt-3'>{correctedData}</p>
            </div>}
        </div>
      )}
    </div>
  )
}

export default Dashboard;
