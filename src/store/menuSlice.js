import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isOpen: [], // for active default menu
        opened: true
    },
    reducers: {
        MENU_OPEN(state, action) {
            state.isOpen = [action.id];
        },
        SET_MENU(state, action) {
            state.opened = action.payload;
        }
    }
});

export const { MENU_OPEN, SET_MENU } = menuSlice.actions;
export default menuSlice.reducer;
