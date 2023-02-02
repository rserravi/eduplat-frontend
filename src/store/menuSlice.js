import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isOpen: {
            id: ""
        }, // for active default menu
        previous:{
            id:""
        },
        opened: true
    },
    reducers: {
        MENU_OPEN(state, action) {
            console.log(action)
            state.isOpen = action.payload;
        },
        SET_MENU(state, action) {
            state.opened = action.payload;
        }
    }
});

export const { MENU_OPEN, SET_MENU } = menuSlice.actions;
export default menuSlice.reducer;
