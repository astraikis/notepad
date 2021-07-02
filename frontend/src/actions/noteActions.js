import axios from 'axios'

import {
    NOTE_LIST_REQUEST,
    NOTE_LIST_SUCCESS,
    NOTE_LIST_FAIL,

    NOTE_ADD_REQUEST,
    NOTE_ADD_SUCCESS,
    NOTE_ADD_FAIL,

    NOTE_COMPLETE_REQUEST,
    NOTE_COMPLETE_SUCCESS,
    NOTE_COMPLETE_FAIL,

    NOTE_TO_DELETE_REQUEST,
    NOTE_TO_DELETE_SUCCESS,
    NOTE_TO_DELETE_FAIL,

    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL,

    NOTE_TO_EDIT_REQUEST,
    NOTE_TO_EDIT_SUCCESS,
    NOTE_TO_EDIT_FAIL,

    NOTE_EDIT_REQUEST,
    NOTE_EDIT_SUCCESS,
    NOTE_EDIT_FAIL
} from '../constants/noteConstants'

export const listNotes = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            '/api/',
            config
            )

        dispatch({
            type: NOTE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NOTE_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const listImportantNotes = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            '/api/important/',
            config
            )

        dispatch({
            type: NOTE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NOTE_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const listCompletedNotes = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            '/api/completed/',
            config
            )

        dispatch({
            type: NOTE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NOTE_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const addNote = (content, important, completed, query, setQuery) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_ADD_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const note = {
            'content': content,
            'important': important,
            'completed': completed
        }

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            '/api/create/',
            note,
            config
            )

        dispatch({
            type: NOTE_ADD_SUCCESS,
            payload: data
        })

        dispatch(listNotes())
        setQuery('all')

    } catch (error) {
        dispatch({
            type: NOTE_ADD_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const completeNote = (note_id, query, setQuery) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_COMPLETE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.put(
            '/api/complete/',
            note_id,
            config
            )

        dispatch({
            type: NOTE_COMPLETE_SUCCESS,
            payload: data
        })

        dispatch(listNotes())
        setQuery('all')

    } catch (error) {
        dispatch({
            type: NOTE_COMPLETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const setNoteToDelete = (note_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_TO_DELETE_REQUEST })

        dispatch({
            type: NOTE_TO_DELETE_SUCCESS,
            payload: note_id
        })

    } catch (error) {
        dispatch({
            type: NOTE_TO_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const deleteNote = (setQuery) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_DELETE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const {
            noteToDelete: { note }
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.delete(
            '/api/delete/',
            {data:{
                note: note,
                user: userInfo['username']
            }},
            config
            )

        dispatch({
            type: NOTE_DELETE_SUCCESS,
            payload: data
        })

        dispatch(listNotes())
        setQuery('all')

    } catch (error) {
        dispatch({
            type: NOTE_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const setNoteToEdit = (note_id, note_content, note_important, note_completed) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_TO_EDIT_REQUEST })

        const note = {
            note_id,
            note_content,
            note_important,
            note_completed
        }

        dispatch({
            type: NOTE_TO_EDIT_SUCCESS,
            payload: note
        })

    } catch (error) {
        dispatch({
            type: NOTE_TO_EDIT_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const editNote = (id, content, important, completed, query, setQuery) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_EDIT_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const note = {
            'id': id,
            'content': content,
            'important': important,
            'completed': completed
        }

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.put(
            '/api/edit/',
            note,
            config
            )

        dispatch({
            type: NOTE_EDIT_SUCCESS,
            payload: data
        })

        dispatch(listNotes())
        setQuery('all')

    } catch (error) {
        dispatch({
            type: NOTE_EDIT_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}