import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material';
import i18next from 'i18next';
import { 
  navigationClientPanel,
  navigationAppointmentPanel, 
  navigationDrawer, 
  navigationLoading,
  navigationSuccess,
   navigationCommunicationsPanel } from '../slices/navigation-slice';

//ICONS
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import EuroIcon from '@mui/icons-material/Euro';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CellTowerIcon from '@mui/icons-material/CellTower';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function SideMenu(boardState) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [width, setWidth] = React.useState(Number(window.innerWidth));

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    }
  React.useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

  const isMobile = width <= 768;
  
  const {showMenu, drawerOpen, customerOpen, appointmentsOpen, communicationsOpen} = boardState.boardState;
  //let actualScreen = screen;
  let open = drawerOpen;
  let expandClients = customerOpen;
  let expandAppo  =appointmentsOpen;
  let expandCom = communicationsOpen;

  if (isMobile){
    open = false;
    dispatch(navigationDrawer(false))
  }


  const goTo = (actualScreen) =>{
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const toggleDrawer = () => {
    if (!isMobile){
    open = !open;
    dispatch(navigationDrawer(open));
    }
     
  };

  const toggleClients = () =>{
    expandClients = !expandClients;
    dispatch(navigationClientPanel(expandClients));
  }

  const toggleAppointment = () =>{
    expandAppo = !expandAppo;
    dispatch(navigationAppointmentPanel(expandAppo));
  }

  const toggleCom = () =>{
    expandCom = !expandCom;
    dispatch(navigationCommunicationsPanel(expandCom));
  }

  const toggleDashboad = () =>{
    goTo("/dashboard");
  }

  const toogleAddCustomer = () =>{
    goTo("/addcustomer");
  }

  const toogleShoweAllCustomers= () =>{
    goTo("/customers");
  }

  const toogleAddAppointment= () =>{
    goTo("/addappointment");
  }

  const toogleShowAppointment= () =>{
    goTo("/appointments");
  }

  const toogleShowDeposits = () =>{
    goTo("/deposits");
  }

  const toogleShowCalendar= () =>{
    goTo("/calendar");
  }
  const toogleShowIntegrations= () =>{
    goTo("/integrations");
  }

  const toogleAddCommunication = ()=>{
    goTo("/addcommunication")
  }

  const toogleSeeCommunication = ()=>{
    goTo("/communications")
  }


  const toogleSeeAllReports = ()=>{
    goTo("/reports/all")
  }


 
  if(showMenu){
  return (
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon/>}
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
               
            <ListItemButton onClick={toggleDashboad}>
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary= {i18next.t("dashboard")} />
            </ListItemButton>
            
            {/* Customers */}
            <ListItemButton onClick={toggleClients}>
                <ListItemIcon>
                <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={i18next.t("customers")} />
                {expandClients ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={expandClients} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl:4}} onClick={toogleAddCustomer}>
                  <ListItemIcon>
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText primary={i18next.t("addnewcustomer")} />
                </ListItemButton>

                <ListItemButton sx={{ pl:4}} onClick={toogleShoweAllCustomers}>
                  <ListItemIcon>
                    <PeopleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={i18next.t("allcustomers")} />
                </ListItemButton>
            </Collapse>

            {/* Appointments */}
            <ListItemButton onClick={toggleAppointment}>
                <ListItemIcon>
                <ViewAgendaIcon />
                </ListItemIcon>
                <ListItemText primary={i18next.t("appointments")} />
                {expandAppo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={expandAppo} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl:4}} onClick={toogleAddAppointment}>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText primary={i18next.t("addappointment")} />
                </ListItemButton>
                
                <ListItemButton sx={{ pl:4}} onClick={toogleShowAppointment}>
                  <ListItemIcon>
                    <CalendarViewWeekIcon />
                  </ListItemIcon>
                  <ListItemText primary={i18next.t("seeappointments")} />
                </ListItemButton>
            </Collapse>

            {/* Deposits */}
            <ListItemButton onClick={toogleShowDeposits}>
                <ListItemIcon >
                <EuroIcon />
                </ListItemIcon>
                <ListItemText primary={i18next.t("deposits")} />
            </ListItemButton>

            {/* Comunications */}
            <ListItemButton onClick={toggleCom}>
                <ListItemIcon>
                  <CellTowerIcon />
                </ListItemIcon>
                <ListItemText primary={i18next.t("communications")} />
                {expandCom ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={expandCom} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl:4}} onClick={toogleAddCommunication}>
                  <ListItemIcon>
                    <ContactPhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={i18next.t("addcommunication")} />
                </ListItemButton>
                
                <ListItemButton sx={{ pl:4}} onClick={toogleSeeCommunication}>
                  <ListItemIcon>
                    <CalendarViewWeekIcon />
                  </ListItemIcon>
                  <ListItemText primary={i18next.t("seecommunications")} />
                </ListItemButton>
            </Collapse>

            {/* Calendar */}
            <ListItemButton onClick={toogleShowCalendar}>
                <ListItemIcon>
                <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary={i18next.t("calendar")}/>
            </ListItemButton>

            <ListItemButton onClick={toogleShowIntegrations}>
                <ListItemIcon>
                <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={i18next.t("integrations")} />
            </ListItemButton>
         
            <Divider sx={{ my: 1 }} />
            
            <ListSubheader component="div" inset>
            {i18next.t("savedReports")}
            </ListSubheader>

            <ListItemButton onClick={toogleSeeAllReports}>
              <ListItemIcon>
                  <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={i18next.t("reportall")} />
            </ListItemButton>
            
          </List>
        </Drawer>        
  );}
  else {
    return <></>
  }
}

export default SideMenu;