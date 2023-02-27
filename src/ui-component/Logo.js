import React from 'react';
import {Image} from 'mui-image';
import logoWhite from 'src/assets/images/LOGO-Eduplat-W.png';
import logoBlack from 'src/assets/images/LOGO-Eduplat-W.png';

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
