import * as React from 'react';
import { fetchUser } from 'src/api/userApi';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { SET_AUTH_USER } from 'src/store/userSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import Logo from 'src/ui-component/Logo';
import HeaderMenu from 'src/menu-items/headerMenu';
import { SearchInBar } from './searchInBar';
import { UserMenu } from './userMenu';
import { AlertsInBar } from './alertsInBar';
import i18next from 'i18next';
import { MessagesInBar } from '../messages/messages-inBar';


// ==============================|| MAIN HEADER ||============================== //


const theme = createTheme(themeOptions);

function MainHeader() {

    // eslint-disable-next-line
    const [error, setError] = useState("");
    const user = useSelector(state => state.user)
    //const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>{
        const loadUser = async () =>{
            try {
                await fetchUser().then((response)=>{
                    //console.log(response)
                    if (response.user){
                        dispatch (SET_AUTH_USER(response.user));
                       /*  if (response.user.language!=="BROWSER"){
                          var lang = response.user.language.toLowerCase();
                          console.log("USUARIO ENCONTRADO. IDIOMA", lang)
                          i18next.changeLanguage(lang).then(()=>console.log("IDIOMA FINAL",i18next.language)).catch((err)=>{console.error(err)})
                          
                        } */
                    }
                }).catch(error=>{
                    console.log(error);
                    setError(error);
                })
                
            } catch (error) {
                setError(error);
            }
        }
        
        async function fetchData(){
            if(!user ||user._id===""){
                const loadedUser =  loadUser()
               
                //console.log(loadedUser)
            }
        }
        fetchData()
        
    },[user, dispatch])

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl" >
        <Toolbar >

            {/* FOR BROWSER */}

          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
            <Logo color="white"/>
          </Box>

           {/* FOR MOBILE */}

          <HeaderMenu device="Mobile" user={user}/>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} >
            <Logo color="white"/>
          </Box>

           {/* FOR BROWSER */}

            <HeaderMenu device="Browser" user={user}/>

            {/* FOR BROWSER AND MOBLIE */}

          <SearchInBar />
          <MessagesInBar />
          <AlertsInBar user={user} />
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default MainHeader;