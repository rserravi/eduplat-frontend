import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Chip,
    Box, 
    ButtonBase,
    Badge,
    Popper,
    ClickAwayListener,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Grid,
    Divider,
    InputAdornment,
    Typography,
    Paper,
    Card,
    CardContent,
    Stack,
    Switch,

} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationsIcon from '@mui/icons-material/Notifications';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

import { themeOptions } from 'src/theme/theme';


// assets
import MainCard from 'src/ui-component/cards/MainCard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import config from 'src/config';


// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme(themeOptions);
   
    const navigate = useNavigate();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const user = useSelector(state => state.user)
    // eslint-disable-next-line 
    const [alertsOpen, setAlertsOpen]= useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const userOpen = Boolean(anchorElUser);
    // eslint-disable-next-line 
    const [setupOpen, setSetupOpen]= useState(false);
    const [value, setValue] = useState('');
    const [sdm, setSdm] = useState(true);
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleToggle = () =>{

    }

    const handleClose = ()=>{
        setAnchorElUser(null);
    }

    const handleToggleUser = (event) =>{
        setAnchorElUser(anchorElUser ? null: event.currentTarget);
    }
    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };

    const handleLogout = ()=>{

    }

    return (
        <>
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <Badge badgeContent={4} color="primary">
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        
                        aria-controls={alertsOpen ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <NotificationsIcon stroke={1.5} size="1.3rem" />
                    </Avatar>
                </Badge>
            </ButtonBase>

            <ButtonBase sx={{ borderRadius: '12px', ml:1 }}>
                <Avatar
                    variant="rounded"
                    src= {user.picture.fileName}
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark,
                        '&[aria-controls="menu-user"],&:hover': {
                            background: theme.palette.secondary.dark,
                            color: theme.palette.secondary.light
                        }
                    }}
                    
                    aria-controls={userOpen ? 'menu-user' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggleUser}
                    color="inherit"
                >
                    
                </Avatar>
            </ButtonBase>

            <ButtonBase sx={{ borderRadius: '12px', ml:1 }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark,
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            background: theme.palette.secondary.dark,
                            color: theme.palette.secondary.light
                        }
                    }}
                    
                    aria-controls={setupOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <SettingsIcon stroke={1.5} size="1.3rem" />
                </Avatar>
            </ButtonBase>

            {/* MENU USER  */}

            <Popper 
                id={userOpen ? 'menu-user':undefined}
                open = {userOpen} 
                anchorEl={anchorElUser}
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                            <Box sx={{ p: 2 }}>
                                <Stack>
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <Typography variant="h4">Good Morning,</Typography>
                                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                            {user.firstname} {user.lastname}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="subtitle2">{user.type}</Typography>
                                </Stack>
                                <OutlinedInput
                                    sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                                    id="input-search-profile"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Search profile options"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <ManageSearchIcon stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                        </InputAdornment>
                                    }
                                    aria-describedby="search-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                />
                                <Divider />
                            </Box>
                            <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                <Box sx={{ p: 2 }}>
                                    AQUI VA PUBLI 
                                    <Divider />
                                    <Card
                                        sx={{
                                            bgcolor: theme.palette.primary.light,
                                            my: 2
                                        }}
                                    >
                                        <CardContent>
                                            <Grid container spacing={3} direction="column">
                                                <Grid item>
                                                    <Grid item container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1">Start DND Mode</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Switch
                                                                color="primary"
                                                                checked={sdm}
                                                                onChange={(e) => setSdm(e.target.checked)}
                                                                name="sdm"
                                                                size="small"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Grid item container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1">Allow Notifications</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Switch
                                                                checked={notification}
                                                                onChange={(e) => setNotification(e.target.checked)}
                                                                name="sdm"
                                                                size="small"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Divider />
                                    <List
                                        component="nav"
                                        sx={{
                                            width: '100%',
                                            maxWidth: 350,
                                            minWidth: 300,
                                            backgroundColor: theme.palette.background.paper,
                                            borderRadius: '10px',
                                            [theme.breakpoints.down('md')]: {
                                                minWidth: '100%'
                                            },
                                            '& .MuiListItemButton-root': {
                                                mt: 0.5
                                            }
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{ borderRadius: `${config.borderRadius}px` }}
                                            selected={selectedIndex === 0}
                                            onClick={(event) => handleListItemClick(event, 0, '/user/account-profile')}
                                        >
                                            <ListItemIcon>
                                                <SettingsIcon stroke={1.5} size="1.3rem" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                        </ListItemButton>
                                        <ListItemButton
                                            sx={{ borderRadius: `${config.borderRadius}px` }}
                                            selected={selectedIndex === 1}
                                            onClick={(event) => handleListItemClick(event, 1, '/user/social-profile')}
                                        >
                                            <ListItemIcon>
                                                <PersonIcon stroke={1.5} size="1.3rem" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Grid container spacing={1} justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="body2">Social Profile</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Chip
                                                                label="02"
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: theme.palette.warning.dark,
                                                                    color: theme.palette.background.default
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                }
                                            />
                                        </ListItemButton>
                                        <ListItemButton
                                            sx={{ borderRadius: `${config.borderRadius}px` }}
                                            selected={selectedIndex === 4}
                                            onClick={handleLogout}
                                        >
                                            <ListItemIcon>
                                                <LogoutIcon stroke={1.5} size="1.3rem" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                        </ListItemButton>
                                    </List>
                                </Box>
                            </PerfectScrollbar>
                        </MainCard>
                    </ClickAwayListener>
                </Paper>    
            </Popper>
            
        </>
    );
};

export default ProfileSection;