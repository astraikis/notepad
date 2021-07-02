import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteNote } from '../actions/noteActions'

function DeletePopup({ deleteOpen, setDeleteOpen, setQuery }) {

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteNote(setQuery))
        setDeleteOpen(false)
    }

    return(
        <div className='popup-outer-container-delete'>
            <div className='popup-container-delete'>
                <p>are you sure you want to delete this note?</p>
                <p className='p-sm'>this action is permanent. you can also mark this note as complete.</p>
                <div className='form-bottom-buttons'>
                    <button onClick={ () => setDeleteOpen(!deleteOpen) } className='add-cancel add-cancel-red'><p className='cancel-text'>cancel</p></button>
                    <button onClick={ deleteHandler } className='button-custom button-custom-red'>delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup