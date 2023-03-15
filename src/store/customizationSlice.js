import { createSlice } from '@reduxjs/toolkit';
import config from 'src/config';

const customizationSlice = createSlice({
    name: 'custom',
    initialState: {
        fontFamily: config.fontFamily,
        borderRadius: config.borderRadius,
        drawerWidth: 240
    },
    reducers: {
        SET_FONT_FAMILY(state, action) {
            state.push({
                isOpen: action.payload.fontFamily
            });
        },
        SET_BORDER_RADIUS(state, action) {
            state.push({
                opened: action.payload.borderRadius
            });
        },
        SET_DRAWER_WIDTH(state, action){
            state.drawerWidth = action.payload
        }


    }
});

export const { SET_FONT_FAMILY, SET_BORDER_RADIUS, SET_DRAWER_WIDTH } = customizationSlice.actions;
export default customizationSlice.reducer;
