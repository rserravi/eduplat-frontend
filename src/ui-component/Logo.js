import React from 'react';
import {Image} from 'mui-image';
import logoWhite from 'src/assets/images/LOGO-Eduplat-W.png';
import logoBlack from 'src/assets/images/LOGO-Eduplat-B.png';

// ==============================|| LOGO SVG ||============================== //
var newMaxWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


const Logo = (props) => {

    var logoImg = null;
    const color = props.color;
    var size = props.size;
    const [newWidth, setNewWidth] = React.useState(newMaxWidth);
    React.useEffect(() => {

        function handleResize() {
            setNewWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        }


    window.addEventListener('resize', handleResize)

    },[])

    if (!size) {
        if (newWidth>410){
        size = 150
        }
        else {
            const diff = 410 - newWidth;
            size = 150 -diff;
        }
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
