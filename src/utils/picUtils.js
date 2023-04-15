import * as React from 'react'
import FileResizer from 'react-image-file-resizer';



export const getHeadShot = (user)=>{
    var pic = "";
   
    if (user.picture.type ==="link"){
        if (user.picture.fileName !==null ||user.picture.fileName !==undefined || user.picture.fileName !==""){
            pic = user.picture.fileName
        }
    }
    else {
       //console.log("TIPO DE OBJETO", typeof user.picture.file)
        
         pic = user.picture.file;
        
    }
    if (pic===""){
        pic = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    }

   // console.log("PICTURE EN getHeadShot",pic)

    return pic;
}



export const getRightPicture = (pictureObj)=>{
    var pic = "";
   
    if (pictureObj.type ==="link"){
        if (pictureObj.fileName !==null ||pictureObj.fileName !==undefined ||pictureObj.fileName !==""){
            pic = pictureObj.fileName
        }
       
    }
    else {
      //  console.log(typeof pictureObj.file)
        pic = pictureObj.file;
    }
   

   //console.log("PICTURE EN getHeadShot",pic)

    return pic;
}