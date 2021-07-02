import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { noteListReducer, noteAddReducer, noteCompleteReducer, noteToDeleteReducer, noteDeleteReducer, noteToEditReducer, noteEditReducer } from './reducers/noteReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
    noteList: noteListReducer,
    noteAdd: noteAddReducer,
    noteComplete: noteCompleteReducer,
    noteToDelete: noteToDeleteReducer,
    noteDelete: noteDeleteReducer,
    noteToEdit: noteToEditReducer,
    noteEdit: noteEditReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store