import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { Copyright } from 'src/components/pageStruct/copyright';

import Logo from 'src/ui-component/Logo';
import { Button } from '@mui/material';
import { GeneralUserForm } from 'src/components/form-components/generalUserForm';
import { TypeUserForm } from 'src/components/form-components/edit-type';
import { userUpdate } from 'src/api/userApi';
import { SET_AUTH_USER } from 'src/store/userSlice';
import { DefineRoleForm } from 'src/components/form-components/define-role-Form';
import { RoleForm } from 'src/components/form-components/role-form';


const theme = createTheme(themeOptions);
const steps = ['Review main data', 'Define Role', 'Sensors'];

export const EditProfile = ({ ...others }) =>{

    const storedUser = useSelector(state => state.user)
    const [user, setUser] = useState(JSON.parse(JSON.stringify(storedUser)));
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
    const isStepOptional = (step) => {
      return step === 0;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      //SAVE DATA
      userUpdate(user._id, user).then((result)=>{
        if(result.status==="success"){
          dispatch(SET_AUTH_USER(user));
          console.log(result);
          let newSkipped = skipped;
          if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
          }
      
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        }
        else{
          console.log(result);
        }
        
      }).catch((error)=>{
        console.log(error)
      })
      
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    const updateUser= (data)=>{
      //console.log(data);
      setUser(data);
    }
       
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
              
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Logo />
                   
                    <Typography component="h1" variant="h5">
                        Complete User Profile
                    </Typography>   
                </Box>


                <Box sx={{ width: '100%', mt: 4 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        
                        {activeStep===0?<GeneralUserForm updateUser={updateUser} />:<></>}
                        {activeStep===1?<RoleForm updateUser={updateUser} />:<></>}
                        
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                              {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                            )}

                            <Button onClick={handleNext}>
                              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
                </Box>


                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}