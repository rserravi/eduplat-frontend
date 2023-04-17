import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';

//const theme = createTheme(themeOptions);


export const MessagesInBar = (props)=>{

    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const handleMessagesClick = (event)=>{
        navigate("/messages")
    }

    return(
        <React.Fragment>

            <IconButton color="inversecommon" onClick={handleMessagesClick}>
                <Badge badgeContent={user.alerts.message} color="secondary">
                    <ChatIcon />
                </Badge>
            </IconButton>

        </React.Fragment>
    )
    
}