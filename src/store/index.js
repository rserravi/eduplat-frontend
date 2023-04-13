import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationSlice';
import userReducer from './userSlice';
import menuReducer from './menuSlice';
import conversationReducer from './convesationSlice'

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        custom: customizationReducer,
        user: userReducer,
        conversations: conversationReducer
    }
});
