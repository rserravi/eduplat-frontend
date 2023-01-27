import { createSlice } from '@reduxjs/toolkit';
import config from 'src/config';

const customizationSlice = createSlice({
    name: 'custom',
    initialState: {
        fontFamily: config.fontFamily,
        borderRadius: config.borderRadius
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
        }
    }
});

export const { SET_FONT_FAMILY, SET_BORDER_RADIUS } = customizationSlice.actions;
export default customizationSlice.reducer;
