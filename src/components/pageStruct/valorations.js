import * as React from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Typography, Link } from '@mui/material';
import { longDate } from 'src/utils/dateUtils';
import { FavoriteIcon } from '../favorites';
import {  getRightPicture } from 'src/utils/picUtils';
import { useNavigate } from 'react-router-dom';

export const ResourceValorations = (props) => {
  const valorations = props.edusource.valorations;
  const navigate = useNavigate();

  console.log("VALORACIONES", valorations);

  const onUsrClick = (event, username)=>{
    event.preventDefault();
    navigate("/user/"+username)
  }

   return (
    <>
      <Grid container>
        {valorations.map((valoration, index) => {
          if (valoration.accepted) {
            
            
            return (
              <React.Fragment key={valoration._id}>
                <Card sx={{ width: 240, mr: 1, borderRadius: 4 }}>
                  <CardHeader
                    avatar={
                      <IconButton onClick={(e)=>onUsrClick(e, valoration.senderUser)}>
                        <Avatar alt={valoration.senderUser} src={getRightPicture(valoration.senderAvatar)} />
                      </IconButton>
                    }
                    action={
                      <>
                        <FavoriteIcon value={valoration.value + 1} />
                      </>
                    }
                    title={<Link href={'/user/'+valoration.senderUser}>{'@' + valoration.senderUser}</Link>}
                    subheader={longDate(valoration.date)}
                  />
                  <CardContent>
                    <Typography variant="body1">"<i>{valoration.comment}"</i></Typography>
                  </CardContent>
                </Card>
              </React.Fragment>
            );
          } else {
            return <React.Fragment key={index}></React.Fragment>;
          }
        })}
      </Grid>
    </>
  );
};
