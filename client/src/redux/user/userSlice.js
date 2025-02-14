import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    currentUser: null,
    isLoading: false,
    error: null

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.isLoading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;

        },
        deleteUserStart: (state) => {
            state.isLoading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }

    },
})

export const { signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure } = userSlice.actions;


export default userSlice.reducer;
