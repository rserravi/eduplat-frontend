// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch } from 'react-redux';
import { MENU_OPEN } from 'src/store/menuSlice';
import { useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const Dashboard = () =>{

    const dispatch = useDispatch();
    const menu = {
        id: "Dashboard"
    }
    useEffect(() => {
        dispatch(MENU_OPEN(menu));
    });
    

    return (
        <MainCard title="Dashboard">
            <Typography variant="body2">
                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
                ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
                reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
                qui officiate descent molls anim id est labours.
            </Typography>
        </MainCard>
    )
}

export default Dashboard;