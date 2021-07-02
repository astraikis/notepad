import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { addNote } from '../actions/noteActions'

function AddNote({ addOpen, setAddOpen, query, setQuery }) {

    const [note, setNote] = useState('')
    const [important, setImportant] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [emptyNote, setEmptyNote] = useState(false)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (note.length > 0) {
            dispatch(addNote(
                note,
                important,
                completed,
                query,
                setQuery
            ))
            setAddOpen(!addOpen)
        } else {
            setEmptyNote(true)
        }
    }

    return (
        <div className='popup-container'>
            <div className='popup-inner-container'>
                <form onSubmit={ submitHandler }>
                    { emptyNote && <p className='password-issue'>please add some text to your note!</p> }
                    <textarea
                        id='note'
                        className='custom-input'
                        rows='4'
                        maxLength='250'
                        placeholder='note'
                        value={ note }
                        onChange={ (e) => setNote(e.target.value) }>
                    </textarea>

                    <div>
                        <p className='form-check-label'>important?</p>
                        <input
                            type='checkbox'
                            id='important'
                            value={ important }
                            onChange={ (e) => setImportant(!important) }>
                        </input>
                    </div>

                    <div className='form-bottom-buttons'>
                        <button className='add-cancel' onClick={ () => {setAddOpen(!addOpen)} }><p className='add-cancel-text'>cancel</p></button>
                        <button type='submit' className='button-custom button-custom-blue'>add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote