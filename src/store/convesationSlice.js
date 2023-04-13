import { createSlice } from '@reduxjs/toolkit';

const conversationSlice = createSlice({
    name: 'conversations',
    initialState: [],
    reducers: {
        SET_CONVERSATIONS(state, action) {
            //console.log("EN SETCONVERSARION", action.payload);
            return action.payload
        },
        ADD_CONVERSATION(state, action) {
            state.push( action.payload )
        },
        SET_NULL(state){
            state = [];
        }
    }
});

export const { SET_CONVERSATIONS, ADD_CONVERSATION, SET_NULL } = conversationSlice.actions;
export default conversationSlice.reducer;