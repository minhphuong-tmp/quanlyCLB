import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

// +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = configureStore({
    reducer: {
        user: userReducer
    },
})
export default store; 