import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { completeNote, setNoteToDelete, setNoteToEdit } from '../actions/noteActions'

function Note({ note, query, setQuery, deleteOpen, setDeleteOpen, editOpen, setEditOpen }) {

    const note_id = note.id

    const dispatch = useDispatch()

    const completeHandler = () => {
        dispatch(completeNote({ note_id }, query, setQuery))
    }

    return (
        <div>
            {note.important ?
            <div className='note note-important'>
                <p>{ note.content }</p>
                <div className='note-button-container'>
                    { note.completed
                        ?<span onClick={ completeHandler }><i class="fas fa-check note-button note-button-check-completed"></i></span>
                        :<span onClick={ completeHandler }><i class="fas fa-check note-button note-button-check"></i></span>
                    }
                    <span onClick={ () => { setEditOpen(!editOpen); dispatch(setNoteToEdit(note.id, note.content, note.important, note.completed)) } }><i class="fas fa-edit note-button note-button-edit"></i></span>
                    <span onClick={ () => { setDeleteOpen(!deleteOpen); dispatch(setNoteToDelete(note.id))} }><i class="far fa-times-circle note-button note-button-x"></i></span>
                </div>
            </div>
            :
            <div className='note'>
                <p>{note.content}</p>
                <div className='note-button-container'>
                    { note.completed
                        ?<span onClick={ completeHandler }><i class="fas fa-check note-button note-button-check-completed"></i></span>
                        :<span onClick={ completeHandler }><i class="fas fa-check note-button note-button-check"></i></span>
                    }
                    <span onClick={ () => { setEditOpen(!editOpen); dispatch(setNoteToEdit(note.id, note.content, note.important, note.completed)) } }><i class="fas fa-edit note-button note-button-edit"></i></span>
                    <span onClick={ () => { setDeleteOpen(!deleteOpen); dispatch(setNoteToDelete(note.id))} }><i class="far fa-times-circle note-button note-button-x"></i></span>
                </div>
            </div>
            }
        </div>
    )
}

export default Note