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
        language: '',
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
        isBoss: false,
        valorations:[],
        alerts:{
            user: 0,
            resource: 0,
            message: 0,
            promo: 0,
            recomandation: 0,
        },
        favorites:[]
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
            state.language = action.payload.language;
            state.isBoss = action.payload.isBoss;
            state.favorites = action.payload.favorites;
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
        },
        SET_FAVORITES(state, action) {
           // console.log("ESTAMOS ES SET_FAVORITES", state, action.payload)
            if (state.favorites.includes(action.payload.edusourceid) && !action.payload.value){
             //   console.log("INCLUYE EL FAV")
                const index = state.favorites.indexOf(action.payload.edusourceid);
                if (index > -1){
                    state.favorites.splice(index,1);
                }
            }

            if (!state.favorites.includes(action.payload.edusourceid) && action.payload.value){
               // console.log("NO INCLUYE EL FAV Y ES TRUE")
                state.favorites.push(action.payload.edusourceid)
            }
        }
    }
});

export const { SET_AUTH_USER, SET_LOADING, ADD_SOCIAL, SET_NULL, SET_FAVORITES } = userSlice.actions;
export default userSlice.reducer;
