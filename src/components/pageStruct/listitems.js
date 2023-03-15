import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Badge, Button } from '@mui/material';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';
import ReportOffTwoToneIcon from '@mui/icons-material/ReportOffTwoTone';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Valorate
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="See Comments" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);

export const DrawerValorations = (props) =>{
  const {edusource} = props;
  const valorationNumber = edusource.valorations.length;
  const seeValorations = (e)=>{

  }

  const addOk = (e) =>{

  }

  const addNotOk = (e)=>{

  }

  const reportBrokenLink = (e) =>{

  }

  return (
    <React.Fragment>
    <ListSubheader component="div" inset>
      Value the resource
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon> 
        <Badge color="secondary" badgeContent={valorationNumber} showZero max={99}>
              <CommentTwoToneIcon />
          </Badge>
      </ListItemIcon>
      <ListItemText primary="See Comments" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FavoriteTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Valorate" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LinkOffTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Broken Link?" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ReportOffTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Inapropiate content?" />
    </ListItemButton>
  </React.Fragment>
  )
}
