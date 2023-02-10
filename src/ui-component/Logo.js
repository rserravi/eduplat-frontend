import React from 'react';
import {Image} from 'mui-image';
import logoWhite from 'src/assets/images/Statos_Logo_Hor_WhiteOnTransp_SM.png';
import logoBlack from 'src/assets/images/Statos_Logo_Hor_BlackOnTransp_SM.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {

    var logoImg = null;
    const color = props.color;
    const size = props.size;


    if (color === "white" || color=== "White"){
        logoImg = logoWhite
    }
    else{
        logoImg = logoBlack
    }
   

    return (
        <React.Fragment>
            <Image src={logoImg} width={150
            }  />
        </React.Fragment>
    );
};

export default Logo;
