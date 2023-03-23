import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        username:'',
        firstname:'',
        lastname:'',
        publicData:{
            name:false,
            emails:false,
            address:false,
            phones:false,
            social:false,
            lastLogin:false
        },
        tagline:'',
        editingLevel:'',
        karma:'',
        picture:{
            fileName:'',
            file:'',
            uploadTime:'',
            type:''
        },
        pictureHeader:{
            fileName:'',
            file:'',
            uploadTime:'',
            type:''
        },
        primaryColor:'',
        secondaryColor:'',
        job:{
            position:'',
            workplace:''
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
        lastLogin: '',
        loading: false,
        loaded: false,
        isLogged: true,
        valorations:[],
        alerts:{
            user: 0,
            resource: 0,
            message: 0,
            promo: 0,
            recomandation: 0,
        }
    },
    reducers: {
        SET_AUTH_USER(state, action) {
            //console.log("EN SETAUTHUSER", action.payload);
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.publicData = action.payload.publicData;
            state.tagline = action.payload.tagline;
            state.karma = action.payload.karma;
            state.editingLevel = action.payload.editingLevel;
            state.picture = action.payload.picture;
            state.pictureHeader = action.payload.pictureHeader;
            state.primaryColor = action.payload.primaryColor;
            state.secondaryColor = action.payload.secondaryColor;
            state.job= action.payload.job;
            state.refreshJWT = action.payload.refreshJWT;
            state.isVerified = action.payload.isVerified;
            state.singInOrigin = action.payload.singInOrigin;
            state.isCompleted = action.payload.isCompleted;
            state.randomUrl = action.payload.randomUrl;
            state.emails = action.payload.emails;
            state.address = action.payload.address;
            state.phones = action.payload.phones;
            state.social = action.payload.social;
            state.loading = false;
            state.loaded = true;
            state.lastLogin = action.payload.lastLogin;
            state.isLogged = action.payload.isLogged;
            state.valorations = action.payload.valorations;
            state.alerts = action.payload.alerts;
        },
        SET_LOADING(state, action) {
            state.loading = action.payload;
        },
        ADD_SOCIAL(state, action) {
            state.social.push({
                media:"",
                user:""
            })
        },
        SET_NULL(state){
            state = [];
        }
    }
});

export const { SET_AUTH_USER, SET_LOADING, ADD_SOCIAL, SET_NULL } = userSlice.actions;
export default userSlice.reducer;
