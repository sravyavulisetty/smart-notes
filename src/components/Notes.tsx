import React, { useCallback } from 'react'
import type { Note } from '../types'
import {CirclePlus, Pencil, Trash2, Archive} from "lucide-react";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { archiveNote, deleteNote, editNote } from '../redux/reducers/noteSlice';
import Tooltip from './Tooltip';

type FormData = {
    title: string;
    notes: string;
}
type NotesProps = {
    notes: Note[],
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Notes = ({notes, setFormData, setIsModalOpen}: NotesProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDeleteNote = useCallback((id: number) => {
      dispatch(deleteNote(id))
    },[])
    const handleArchive = useCallback((id: number) => {
        dispatch(archiveNote(id))
      },[])
    const handleEditNote = useCallback((note: Note) => {
        dispatch(editNote(note))
        setFormData({ title: note.title, notes: note.notes });
        setIsModalOpen(true);
      },[notes, dispatch]);
  return (
    <div className='overflow-hidden h-[500px]'>
    <div className='grid gap-5 mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-scroll'>
        {notes.map((note: any) => (
        <div 
        key={note.id}
        className='rounded-md p-5 w-full flex flex-col items-start gap-3 mt-5'
        style={{backgroundColor: note.color}}>
            <div className='flex flex-row justify-between items-center w-full'>
            <p>{note.date}</p>
            <div className='flex flex-row items-center gap-2'>
                <Tooltip content={'Archive'} icon={Archive} size={16} onclick={()=>handleArchive(note.id)}/>
                <Tooltip content={'Edit'} icon={Pencil} size={15} onclick={()=>handleEditNote(note)}/>
                <Tooltip content={'Delete'} icon={Trash2} size={15} onclick={()=>handleDeleteNote(note.id)}/>
                {/* <Archive onClick={()=>handleArchive(note.id)} size={16}/> */}
                {/* <Pencil onClick={()=>handleEditNote(note)} size={15}/> */}
                {/* <Trash2 onClick={()=>handleDeleteNote(note.id)} size={15}/> */}
            </div>
            </div>
            <div className='flex flex-row justify-between items-center w-full border-b border-gray-300 pb-2'>
                <h1 className='text-2xl font-bold'>{note.title}</h1>  
            </div>
    
            <p>{note.notes}</p>
            <p>Last updated: {note.updated_Date}</p>
        </div>
      ))}
      </div>
      </div>
  )
}

export default Notes
