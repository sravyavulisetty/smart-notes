import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../types";
import type { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { isDateInThisWeek, isDateFromThisMonth} from "../../utils/calendarHelper";
interface noteState {
    notes: Note[];
    editableNote: Note | null;
}
const initialState: noteState = {
    notes: [],
    editableNote: null
}

export const selectNotes = (state: RootState) => state.notes

const noteSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        deleteNote : (state, action: PayloadAction<number>) => {
            state.notes =  state.notes.filter((note: Note) => note.id !== action.payload)
        },
        saveNote : (state, action: PayloadAction<Note>) => {
            if(state.editableNote){
                state.notes = state.notes.map((note) => 
                    note.id === state.editableNote?.id ? action.payload : note
                )
                state.editableNote = null;
            }
            else{
                state.notes.push(action.payload)
            }
   
        },
        editNote : (state, action: PayloadAction<Note>) => {
            state.editableNote = action.payload
        },
        clearNote : (state) => {
            state.editableNote = null;
        },
        archiveNote: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.map((note) => note.id === action.payload ? {...note, archived: true} : note)
        },
        unarchiveNote: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.map((note) => note.id === action.payload ? {...note, archived: false} : note)
        }

    }
})

export const archivedNotes = createSelector([selectNotes],
    (notes) => notes.filter(note => note.archived))

export const unarchivedNotes = createSelector([selectNotes],
    (notes) => notes.filter(note => !note.archived))

export const thisWeekNotes = createSelector([selectNotes],
    (notes) => notes.filter(note => {
        const [month, day, year] = note.date.split("/").map(Number);
        const date = new Date(year, month - 1, day)
        return isDateInThisWeek(date);
    })
)

export const todaysNotes = createSelector([selectNotes], 
    (notes) => notes.filter(note => {
        const [month, day, year] = note.date.split("/").map(Number);
        const date = new Date(year, month - 1, day)
        const today = new Date();
        return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
    })
)

export const thisMonthNotes = createSelector([selectNotes],
    (notes) => notes.filter(note => {
        const [month, day, year] = note.date.split("/").map(Number);
        const date = new Date(year, month - 1, day)
        return isDateFromThisMonth(date);
    })
)

export const allNotes = createSelector([selectNotes], 
    (notes) => notes.filter(note => note.archived === false
    )
)

export const {deleteNote, saveNote, editNote, clearNote, archiveNote, unarchiveNote} = noteSlice.actions;
export default noteSlice.reducer;
