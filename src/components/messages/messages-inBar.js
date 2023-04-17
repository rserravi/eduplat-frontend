import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';

//const theme = createTheme(themeOptions);


export const MessagesInBar = (props)=>{
    const {user} = props;

    const navigate = useNavigate();
    const handleMessagesClick = (event)=>{
        navigate("/messages")
    }
    if (user && user._id!==""){
  
        return (
          <>
          {user.alerts && user.alerts!==undefined?<>

   
            <React.Fragment>
                <IconButton color="inversecommon" onClick={handleMessagesClick}>
                    <Badge badgeContent={user.alerts.message} color="secondary">
                        <ChatIcon />
                    </Badge>
                </IconButton>
            </React.Fragment>
            </>:<></>}
    </>  
  )
          }
          else {
            return(<></>)
          }
    
}