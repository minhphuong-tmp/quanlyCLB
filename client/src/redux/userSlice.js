import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    socketConnection: null,
    onlineUser: []

};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload
        },

        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload

        }


    },
    // setSocketConnection: (state, action) => {
    //     console.log("Socket connection payload:", action.payload);  // Log giá trị payload
    //     state.socketConnection = action.payload;
    // }


})


// Action creators are generated for each case reducer function
export const { setSocketConnection, setOnlineUser } = userSlice.actions;

export default userSlice.reducer;