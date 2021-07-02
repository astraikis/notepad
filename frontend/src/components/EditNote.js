import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import store from '../store';

import { editNote } from '../actions/noteActions'

function EditNote({ editOpen, setEditOpen, query, setQuery }) {

    const {
        noteToEdit: { noteToEditObj }
    } = store.getState()

    const id = noteToEditObj.note_id

    const [content, setContent] = useState(noteToEditObj.note_content)
    const [important, setImportant] = useState(noteToEditObj.note_important)
    const [completed, setCompleted] = useState(noteToEditObj.note_completed)

    console.log(important)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editNote(id, content, important, completed, query, setQuery))
        setEditOpen(!editOpen)
    }


    return (
        <div className='popup-outer-container-delete'>
            <div className='popup-container-delete'>
                <form onSubmit={ submitHandler }>
                    <textarea
                        id='note'
                        className='custom-input'
                        rows='4'
                        maxLength='250'
                        placeholder='note'
                        value={ content }
                        onChange={ (e) => setContent(e.target.value) }>
                    </textarea>

                    <div>
                        <p className='form-check-label'>important?</p>
                        <input
                            type='checkbox'
                            id='important'
                            value={ important }
                            defaultChecked={ important }
                            onChange={ (e) => setImportant(!important) }>
                        </input>
                    </div>

                    <div>
                        <p className='form-check-label'>completed?</p>
                        <input
                            type='checkbox'
                            id='completed'
                            value={ completed }
                            defaultChecked={ completed }
                            onChange={ (e) => setCompleted(!completed) }>
                        </input>
                    </div>

                    <div className='form-bottom-buttons'>
                        <button className='add-cancel' onClick={ () => {setEditOpen(!editOpen)} }><p className='add-cancel-text'>cancel</p></button>
                        <button type='submit' className='button-custom button-custom-blue'>edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote