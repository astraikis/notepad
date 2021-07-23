import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listNotes, listImportantNotes, listCompletedNotes } from '../actions/noteActions'

import Navbar from '../components/Navbar'
import Note from '../components/Note'
import AddNote from '../components/AddNote'
import DeletePopup from '../components/DeletePopup'
import EditNote from '../components/EditNote'
import Loader from '../components/Loader'
import Error from '../components/Error'

function HomeScreen({ history }) {

    const [addOpen, setAddOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    const [query, setQuery] = useState('all')

    const dispatch = useDispatch()
    const noteList = useSelector(state => state.noteList)
    const { error, loading, notes } = noteList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            if (query === 'all') {
                dispatch(listNotes())
            } else if (query === 'important') {
                dispatch(listImportantNotes())
            } else if (query === 'completed') {
                dispatch(listCompletedNotes())
            }
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, history, query])

    return (
        <div>
            <Navbar />
            { deleteOpen && <DeletePopup deleteOpen={ deleteOpen } setDeleteOpen={ setDeleteOpen } setQuery={ setQuery } /> }
            { editOpen && <EditNote editOpen={ editOpen } setEditOpen={ setEditOpen } query={ query } setQuery={ setQuery } /> }
            { addOpen && <AddNote addOpen={ addOpen } setAddOpen={ setAddOpen } query={ query } setQuery={ setQuery } /> }
            { loading &&
                <div className='popup-container'>
                    <Loader />
                </div>
            }
            { error &&
                <Error />
            }
            <div className='note-container'>
                <p className='p-lg add-title'>
                    <span className='add-span' onClick={() => {setAddOpen(!addOpen)} }>
                        <i class="fas fa-plus-circle button-add p-lg"></i>
                    </span>
                    add note
                </p>

                <div className='query-selector-container'>
                    <span
                        className={`query-selector ${ query === 'all' ? 'query-selector-active' : ''}`}
                        onClick={ () => setQuery('all') }>
                        all
                    </span>
                    <span 
                        className={`query-selector ${ query === 'important' ? 'query-selector-active' : ''}`}
                        onClick={ () => setQuery('important') }>
                        important
                    </span>
                    <span
                        className={`query-selector ${ query === 'completed' ? 'query-selector-active' : ''}`}
                        onClick={ () => setQuery('completed') }>
                        completed
                    </span>
                </div>

                {notes.length !== 0 ? notes.map(note => (
                    <Note key={note.id} note={note} query={ query } setQuery={ setQuery } deleteOpen={ deleteOpen } setDeleteOpen={ setDeleteOpen } setEditOpen={ setEditOpen } editOpen={ editOpen } />
                ))
                :

                    <div className='no-note-message'>
                        { query === 'all' &&
                            <p>you don't have any notes!</p>
                        }
                        { query === 'important' &&
                            <p>you don't have any important notes!</p>
                        }
                        { query === 'completed' &&
                            <p>you don't have any completed notes!</p>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default HomeScreen