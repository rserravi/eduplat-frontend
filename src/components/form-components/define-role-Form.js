import * as React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import playerImg from 'src/assets/images/Statos_Logo_Hor_BlackOnTransp_SM.png';

import { useState} from 'react';



export const DefineRoleForm = (props)=> {
    const updateUser = props.updateUser;
    const storedUser = useSelector(state => state.user)
    const [user, setUser] = useState(JSON.parse(JSON.stringify(storedUser)));

    const playerOnClick = (event) =>{
        console.log("Player on Click")
    }

    const parentOnClick = (event) =>{
        console.log("Parent on Click")

    }
    const coachOnClick = (event) =>{
        console.log("Coach on Click")

    }
    const managerOnClick = (event) =>{
        console.log("Manager on Click")

    }


    return (
        <React.Fragment>
            <Typography variant="h3" color="text.secondary" align="center" sx={{mb:4, mt:2}} {...props}>
                Define Role
            </Typography>
            <Grid 
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    
                    
                >
                <Grid component={Card} item xs={12} sm={3} sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", mb:2}}>
         
                        <ButtonBase onClick={playerOnClick}>
                            <CardMedia
                                component="img"
                                height="194"
                                //image = {playerImg}
                                image='https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
                                alt="Football Player"
                                
                             />
                        </ButtonBase>


                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            If  you are a football / soccer player, choose:
                            </Typography>
                            <Typography variant="h5" component="div">
                            Player
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            of a team in the club
                            </Typography>
                            <Typography variant="body2">
                            This mode allows you to record
                            <br />
                            all your statistics. You will receive
                            <br />
                            feedback from the coach, 
                            <br />
                            manage your calendar and see
                            <br />
                            your improvement.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="big" onClick={playerOnClick} >Choose Player</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    
                </Grid>
                <Grid component={Card} item xs={12} sm={3} sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", mb:2}}>
                    
                        <ButtonBase onClick={parentOnClick}>
                            <CardMedia
                                component="img"
                                height="194"
                                //image = {playerImg}
                                image='https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
                                alt="Football Player"
                                
                             />
                        </ButtonBase>


                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            If you are a parent and have children in the club, choose:
                            </Typography>
                            <Typography variant="h5" component="div">
                            Parent
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            of a player in the club
                            </Typography>
                            <Typography variant="body2">
                            This mode allows you to manage
                            your child calendar and she/he will 
                            receive updates.
                            <br />
                            You also are included in the team's chat and 
                            can have a look at notices, updates, calendar
                            and coach notes and children improvements
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="big"  onClick={parentOnClick}>Choose Parent</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>

                </Grid>
                <Grid component={Card} item xs={12} sm={3} sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", mb:2}}>
                
                        <ButtonBase onClick={coachOnClick}>
                            <CardMedia
                                component="img"
                                height="194"
                                //image = {playerImg}
                                image='https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
                                alt="Football Player"
                                
                             />
                        </ButtonBase>


                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            If you are a coach of one or more teams, choose:
                            </Typography>
                            <Typography variant="h5" component="div">
                            Coach
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            of a team or teams in the club
                            </Typography>
                            <Typography variant="body2">
                            This mode allows you to see
                            all the software statistics. 
                            <br />
                            You can plan trainings and
                            matches, see (or enter) statistics of teams and players,
                            communicate with players and parents
                            and send individual reports to both.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="big" onClick={coachOnClick}>Choose Coach</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    
                </Grid>
                <Grid component={Card} item xs={12} sm={3} sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", mb:2}}>
                
                        <ButtonBase onClick={managerOnClick}>        
                            <CardMedia
                                component="img"
                                height="194"
                                //image = {playerImg}
                                image='https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
                                alt="Football Player"
                             />
                        </ButtonBase>


                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            If you are a club manager, choose:
                            </Typography>
                            <Typography variant="h5" component="div">
                            Manager
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            of the club
                            </Typography>
                            <Typography variant="body2">
                            This mode allows you to alocate coaches,
                            plan matches and other events (event not sport events),
                            check performance of teams, and many more
        
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="big"  onClick={managerOnClick}>Choose Manager</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                 
                </Grid>
            </Grid>
        </React.Fragment>
    )
}