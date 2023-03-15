import React from 'react';
import {Image} from 'mui-image';
import logoWhite from 'src/assets/images/LOGO-Eduplat-W.png';
import logoBlack from 'src/assets/images/LOGO-Eduplat-B.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {

    var logoImg = null;
    const color = props.color;
    var size = props.size;

    if (!size) {
        size = 150
    }


    if (color === "white" || color=== "White"){
        logoImg = logoWhite
    }
    else{
        logoImg = logoBlack
    }
   

    return (
        <React.Fragment>
            <a href='/'><Image alt='home' src={logoImg} width={size} duration={325} /></a>
        </React.Fragment>
    );
};

export default Logo;
