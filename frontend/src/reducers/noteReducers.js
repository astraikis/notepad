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

export const noteListReducer = (state={ notes:[] }, action) => {
    switch(action.type) {
        case NOTE_LIST_REQUEST:
            return { loading: true, notes: [] }

        case NOTE_LIST_SUCCESS:
            return { loading: false, notes: action.payload }

        case NOTE_LIST_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const noteAddReducer = (state={}, action) => {
    switch(action.type) {
        case NOTE_ADD_REQUEST:
            return { loading: true }

        case NOTE_ADD_SUCCESS:
            return { loading: false, success: true, note: action.payload }

        case NOTE_ADD_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const noteCompleteReducer = (state={}, action) => {
    switch(action.type) {
        case NOTE_COMPLETE_REQUEST:
            return { loading: true }

        case NOTE_COMPLETE_SUCCESS:
            return { loading: false, success: true, note: action.payload }

        case NOTE_COMPLETE_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const noteToDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case NOTE_TO_DELETE_REQUEST:
            return { loading: true }

        case NOTE_TO_DELETE_SUCCESS:
            return { loading: false, success: true, note: action.payload }

        case NOTE_TO_DELETE_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const noteDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case NOTE_DELETE_REQUEST:
            return { loading: true }

        case NOTE_DELETE_SUCCESS:
            return { loading: false, success: true, note: action.payload }

        case NOTE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const noteToEditReducer = (state={}, action) => {
    switch(action.type) {
        case NOTE_TO_EDIT_REQUEST:
            return { loading: true }

        case NOTE_TO_EDIT_SUCCESS:
            return { loading: false, success: true, noteToEditObj: action.payload }

        case NOTE_TO_EDIT_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const noteEditReducer = (state={}, action) => {
    switch(action.type) {
        case NOTE_EDIT_REQUEST:
            return { loading: true }

        case NOTE_EDIT_SUCCESS:
            return { loading: false, success: true, note: action.payload }

        case NOTE_EDIT_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}