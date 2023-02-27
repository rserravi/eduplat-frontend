import * as React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import playerImg from 'src/assets/images/Statos_Logo_Hor_BlackOnTransp_SM.png';

import { useState} from 'react';



export const RoleForm = (props)=> {
    const updateUser = props.updateUser;
    const storedUser = useSelector(state => state.user)
    const [user, setUser] = useState(JSON.parse(JSON.stringify(storedUser)));
    console.log(user);

    const PlayerFrag = () =>{
        return (
            <React.Fragment>
                <Typography variant="h3" color="text.secondary" align="center" sx={{mb:4, mt:2}} {...props}>
                Player
                </Typography>
            </React.Fragment>
        )
    }

    const ParentFrag = () =>{
        return (
            <React.Fragment>
                <Typography variant="h3" color="text.secondary" align="center" sx={{mb:4, mt:2}} {...props}>
                Parent
                </Typography>
            </React.Fragment>
        )
    }

    const CoachFrag = () =>{
        return (
            <React.Fragment>
                <Typography variant="h3" color="text.secondary" align="center" sx={{mb:4, mt:2}} {...props}>
                Coach
                </Typography>
            </React.Fragment>
        )
    }

    const ManagerFrag = () =>{
        return (
            <React.Fragment>
                <Typography variant="h3" color="text.secondary" align="center" sx={{mb:4, mt:2}} {...props}>
                Manager
                </Typography>
            </React.Fragment>
        )
    }

    const ShowRole = () =>{
        switch (user.type.typeDef) {
            case "player":
                return (
                    <PlayerFrag />
                )
            case "parent":
                return (
                    <ParentFrag />
                )
            case "coach":
                return (
                    <CoachFrag />
                )
            case "manager":
                return (
                    <ManagerFrag />
                )
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h3" color="text.secondary" align="center" sx={{mb:4, mt:2}} {...props}>
                Refine Role
            </Typography>

            <ShowRole />
        </React.Fragment>
    )
}