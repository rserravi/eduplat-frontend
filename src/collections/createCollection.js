import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const theme = createTheme(themeOptions);

export const CreateCollection= () =>{

    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    React.useEffect(()=>{
        if (!user ||user==null ||user._id==="" || user._id===null ||user._id===undefined){
            navigate("/login");
        }
       
    },[user._id, user, navigate])
    return(
        <React.Fragment>
             <ThemeProvider theme={theme}>
                CREATING COLLECTION
            </ThemeProvider>
        </React.Fragment>
        
    )
}