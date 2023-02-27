import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        username:'',
        firstname:'',
        lastname:'',
        type:{
            typeDef:'',
            linkId:'',
            sensors:'',
            parenting:'',
            teams:''
        },
        gender:'',
        dni:'',
        picture:{
            fileName:'',
            uploadTime:'',
            type:''
        },
        refreshJWT:{
            token:'',
            addedAt:''
        },
        isVerified: false,
        singInOrigin:'',
        isCompleted:0,
        randomUrl:'',
        emails:[],
        address:[],
        phones:[],
        social:[],
        birthdate:'',
        loading: false,
        loaded: false,
        lastLogin: '',
        isLogged: true,
    },
    reducers: {
        SET_AUTH_USER(state, action) {
            //console.log("EN SETAUTHUSER", action.payload);
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.type = action.payload.type;
            state.gender = action.payload.gender;
            state.dni = action.payload.dni;
            state.picture = action.payload.picture;
            state.refreshJWT = action.payload.refreshJWT;
            state.isVerified = action.payload.isVerified;
            state.singInOrigin = action.payload.singInOrigin;
            state.isCompleted = action.payload.isCompleted;
            state.randomUrl = action.payload.randomUrl;
            state.emails = action.payload.emails;
            state.address = action.payload.address;
            state.phones = action.payload.phones;
            state.social = action.payload.social;
            state.birthdate = action.payload.birthdate;
            state.loading = false;
            state.loaded = true;
            state.lastLogin = action.payload.lastLogin;
            state.isLogged = action.payload.isLogged;
        },
        SET_LOADING(state, action) {
            state.loading = action.payload;
        },
        ADD_SOCIAL(state, action) {
            state.social.push({
                media:"",
                user:""
            })
        }
    }
});

export const { SET_AUTH_USER, SET_LOADING, ADD_SOCIAL } = userSlice.actions;
export default userSlice.reducer;
