import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';


export default function EduSourceCard(props) {

   const {title, autor, autorAvatar, date, discipline, image, extract, labels} = props;

   const subh =   discipline + ",  " + date;

  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: red[500] }} 
            aria-label="autorAvatar"
            alt={autor}
            src={autorAvatar}
            >
            {autorAvatar?<></>:<>{autor.charAt(1).toUpperCase()}</>}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader= {subh}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
      />
      <CardContent>
      <Typography variant="p" color="text.terciary">
         {labels}
       </Typography>
        <Typography variant="body2" color="text.secondary">
          {extract}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small"> by {autor}</Button>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
     
    </Card>
  );
}