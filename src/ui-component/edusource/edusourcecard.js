import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';


export default function EduSourceCard(props) {

  const {title, autor, autorAvatar, date, discipline, image, extract, labels} = props;
  const [hovering, setHovering] = React.useState(false);
  const subh =   discipline + ",  " + date;

  const visitPromoter = (event)=>{
    console.log("VISITANDO PROMOTER ", autor)
  }

  const shareCard = (event)=>{
    console.log("SHARING " + title);
  }

  return (
    <Card 
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        sx={{
          position:"relative",
          '&:hover': {
          
            zIndex: 10,
        },
          
        }}
    >
      {hovering?<>
      <CardHeader
      sx={{height:80}}

        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{variant:'body1' }}
        title={title}
        subheader= {subh}
      />
      </>:<>
      <CardHeader
        sx={{height:80}}
        titleTypographyProps={{variant:'body1' }}
        title={title}
        subheader= {subh}
      />
      </>}
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
      />
       {hovering?<>
      <CardContent>
      <Typography sx={{fontSize:10}} variant="p" color="text.terciary">
         {labels}
       </Typography>
        <Typography sx={{fontSize:12}} variant="body2" color="text.secondary">
          {extract}
        </Typography>
      </CardContent>
      </>:<></>}
      <CardActions disableSpacing>
        <Button size="small" onClick={visitPromoter}> by {autor}</Button>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={shareCard}>
          <ShareIcon />
        </IconButton>
        
      </CardActions>
     
    </Card>
  );
}