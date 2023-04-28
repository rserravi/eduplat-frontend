import { CssBaseline, Grid, Button, Typography, Divider } from '@mui/material';
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';
import { useOutletContext, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MyAccountData } from './comp/myAccount-data';
import Loader from 'src/ui-component/Loader';
import { MyAccountSetup } from './comp/myAccount-setup';
import { MyAccountValorations } from './comp/myAccoun-valorations';
import { MyAccountResources } from './comp/myAccount-resources';
import { MyAccountAdministration } from './comp/myAccount-administration';


const theme = createTheme(themeOptions);

export const MyAccount = () =>{
    const [newWidth] = useOutletContext();
    const {tab} = useParams();
    const [selected, setSelected] = React.useState(tab)
    const user = useSelector(state => state.user) 
   

    const selectTab = (event, value) =>{
        
        setSelected(value);
    }


    if (user && user._id!==""){
    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    minWidth={newWidth - 32}
                    p={1}
                >
                    <Grid item>
                        <Typography sx={{ ml:1, mt:1}} variant="body1">
                            <b>{i18next.t("My account")}:</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button 
                            color={selected==='data'?'secondary':'primary'} 
                            onClick={(event)=>{selectTab(event, "data")}}  
                            sx={{ borderRadius:5, mt:1 }}> 
                            {selected==='data'?<u>{i18next.t("Data")}</u>:i18next.t("Data")}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            color={selected==='setup'?'secondary':'primary'} 
                            onClick={(event)=>{selectTab(event, "setup")}} 
                            sx={{ borderRadius:5, mt:1 }}> 
                            {selected==='setup'?<u>{i18next.t("Setup")}</u>:i18next.t("Setup")}
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button 
                            color={selected==='valorations'?'secondary':'primary'} 
                            onClick={(event)=>{selectTab(event, "valorations")}} 
                            sx={{ borderRadius:5, mt:1 }}> 
                            {selected==='valorations'?<u>{i18next.t("valorations")}</u>:i18next.t("valorations")}
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button 
                            color={selected==='resources'?'secondary':'primary'} 
                            onClick={(event)=>{selectTab(event, "resources")}} 
                            sx={{ borderRadius:5, mt:1 }}> 
                            {selected==='resources'?<u>{i18next.t("resources")}</u>:i18next.t("resources")}
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button 
                            color={selected==='collections'?'secondary':'primary'} 
                            onClick={(event)=>{selectTab(event, "collections")}}
                            sx={{ borderRadius:5, mt:1 }}> 
                            {selected==='collections'?<u>{i18next.t("Collections")}</u>:i18next.t("Collections")}
                        </Button>
                    </Grid>
                    {user.isBoss?<>
                        <Grid item >
                            <Button 
                                color={selected==='administration'?'secondary':'primary'} 
                                onClick={(event)=>{selectTab(event, "administration")}}
                                sx={{ borderRadius:5, mt:1 }}> 
                                {selected==='administration'?<u>{i18next.t("Administration")}</u>:i18next.t("Administration")}
                            </Button>
                    </Grid>
                    </>:<></>}
                    
               </Grid>
               <Divider />
                {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        minWidth: {newWidth} -32,
                        p:2
                    }}
                    > */}

                    {selected==="data"?<><MyAccountData user={user} /></>:<></>}
                    {selected==="setup"?<><MyAccountSetup user={user} /></>:<></>}
                    {selected==="valorations"?<><MyAccountValorations user={user} /></>:<></>}
                    {selected==="resources"?<><MyAccountResources user={user} /> </>:<></>}
                    {selected==="administration"?<><MyAccountAdministration user={user} /> </>:<></>}
               {/*  </Box> */}
            </ThemeProvider>
        </React.Fragment>
    )}
    else {
        return(<>
            <Loader />
        </>)
    }
}