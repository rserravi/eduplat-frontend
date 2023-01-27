import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        name: '',
        email: '',
        role: '',
        photo: '',
        provider: '',
        verified: '',
        loading: false,
        loaded: false
    },
    reducers: {
        SET_AUTH_USER(state, action) {
            state = action.payload;
        },
        SET_LOADING(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { SET_AUTH_USER, SET_LOADING } = userSlice.actions;
export default userSlice.reducer;
