import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationSlice';
import userReducer from './userSlice';
import menuReducer from './menuSlice';

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        custom: customizationReducer,
        user: userReducer
    }
});
