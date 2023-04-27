import { Alert, Box, Container, CssBaseline, Link } from "@mui/material";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userRegistrationVerification } from "src/api/userApi";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const initialResponse = {
  status :"",
  message :"",
}

const theme = createTheme(themeOptions);

export const UserVerification = () => {

    const {randomUrl, email} = useParams();
    const[response, setResponse] = useState(initialResponse);
    
    useEffect(()=>{
        const apiCall = async () => {
          const result = await userRegistrationVerification({randomUrl, email});
          setResponse(result);
        }
      
        !response.status && apiCall();
    },[response,randomUrl, email]);

    
    return (
      <>
      {response.status!==""?<>
      <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p:2
                    }}
                    >
                      {response.status && <Alert severity={response.status === "success" ? "success" : "warning"}>{i18next.t(response.message)}</Alert>}
                      {response.status === "success" ? <Link m={5} href="/login">{i18next.t("Go to Login Page")}</Link>: <p></p>}
                      {response.status === "error" ? <p>{i18next.t("Please check that your are sending the correct link from your confirmation email")}</p>: <p></p>}       
                  </Box>
                </Container>
              </ThemeProvider>
      </>:<></>}
       
        </>
        )
}