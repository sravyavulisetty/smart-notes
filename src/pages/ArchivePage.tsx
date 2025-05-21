import { useSelector, useDispatch } from 'react-redux'
import { type AppDispatch,} from '../store'
import { deleteNote, unarchiveNote } from '../redux/reducers/noteSlice'
import { archivedNotes } from '../redux/reducers/noteSlice'
import { ArchiveX, Trash2 } from 'lucide-react'

const ArchivePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const archived = useSelector(archivedNotes);
    // const archivedNotes = useSelector((state: RootState) => state.notes.filter((note: Note) => note.archived === true))
    const handleDeleteNote = (id: number) => {
        dispatch(deleteNote(id))
    }
    const handleUnarchiveNote = (id: number) => {
        dispatch(unarchiveNote(id))
    }

  return (
    <div>
       <div className='grid gap-5 mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
              {archived.map((note) => (
              <div 
              key={note.id}
              className='rounded-md p-5 w-fit flex flex-col items-start gap-3 mt-5'
              style={{backgroundColor: note.color}}>
                  <div className='flex flex-row justify-between items-center w-full'>
                  <p>{note.date}</p>
                  <div className='flex flex-row items-center gap-2'>
                      <ArchiveX onClick={()=>handleUnarchiveNote(note.id)}/>
                      <Trash2 onClick={()=>handleDeleteNote(note.id)}/>
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

export default ArchivePage
