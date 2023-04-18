import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const findConversationById = (id, conversations) => {
    //console.log("CONVERSATIONS EN FINDCONVERSATION BY ID", conversations)
    var foundedConv = null
    var index = null;
    for (let i = 0; i < conversations.length; i++) {
        if (conversations[i]._id === id){
            foundedConv = conversations[i]
            index = i;
            break;
        }
        
    }
    return {"conversation":foundedConv, "index": index}
}

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
        },
        MARK_CONVERSATION_AS_READED(state, action) {
            const theOser = action.payload.userId;
            const convId = action.payload.conversationId;
            const obj = findConversationById(convId, current(state))
            const newArray = [...state]
            for (let i = 0; i < newArray[obj.index].messages.length; i++) {
                if (newArray[obj.index].messages[i].senderId !== theOser){
                    newArray[obj.index].messages[i].readed = true;
                }
            }
            state = newArray;
            
        },
        GET_CONVERSATIONS (state){
            return state;
        }
    }
});

export const { GET_CONVERSATIONS, SET_CONVERSATIONS, ADD_CONVERSATION, SET_NULL, MARK_CONVERSATION_AS_READED } = conversationSlice.actions;
export default conversationSlice.reducer;