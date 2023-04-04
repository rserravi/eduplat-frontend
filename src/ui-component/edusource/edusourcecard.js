import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { ValorationMeanIcon } from 'src/components/favorites';
import { shortDate } from 'src/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';


export default function EduSourceCard(props) {

  const {edusource} = props;
  const [hovering, setHovering] = React.useState(false);
  const navigate = useNavigate();
  const subh =   edusource.discipline.charAt(0).toUpperCase() + edusource.discipline.slice(1) + ",  " + shortDate(edusource.date);

  const visitPromoter = (event)=>{
    event.preventDefault();
    navigate("/user/"+edusource.promoterId.username);
  }

  const shareCard = (event)=>{
    console.log("SHARING " + edusource.title);
    //TODO
  }

  const handleCardClic = (event)=>{
    event.preventDefault();
    navigate("/resources/"+ edusource.resourceURL);

  }

  const imgstyles = {
    media: {
      height: 160,
      objectFit:"cover"
    }
};

  return (
    <Card 
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        sx={{ minWidth:260,
          
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
        title={edusource.title}
        subheader= {subh}
      />
      </>:<>
      <CardHeader
        sx={{height:80}}
        titleTypographyProps={{variant:'body1' }}
        title={edusource.title}
        subheader= {subh}
      />
      </>}
      {hovering?<>
      <CardMedia
        component="img"
        className='classes.media'
        style={imgstyles.media}
        onClick={handleCardClic}
        image={edusource.picture.fileName}
        alt={edusource.title}
        sx= {{cursor:"pointer",filter: "opacity(10%)"}}
      />
      </>:<>
      <CardMedia
        component="img"
        className='classes.media'
        style={imgstyles.media}
        onClick={handleCardClic}
        image={edusource.picture.fileName}
        alt={edusource.title}
        sx= {{cursor:"pointer",filter: "opacity(100%)"}}
        
      />
      </>
      }
      {hovering?<>
      <CardContent onClick={handleCardClic} style={{cursor:"pointer",position:"absolute", marginTop:-150}}>
      <Typography sx={{fontSize:10}} variant="p" color="text.terciary">
         {edusource.theme[0]}
       </Typography>
        <Typography sx={{fontSize:12}} variant="body2" color="text.secondary">
          {edusource.description}
        </Typography>
      </CardContent>
      </>:<></>} 
      <CardActions disableSpacing>
        <Button size="small" onClick={visitPromoter}> {i18next.t("by")} @{edusource.promoterId.username}</Button>
        
          <ValorationMeanIcon valorations={edusource.valorations} />
       
        <IconButton aria-label="share" onClick={shareCard}>
          <ShareIcon />
        </IconButton>
        
      </CardActions>
     
    </Card>
  );
}