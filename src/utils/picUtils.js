
import React, { useRef } from "react";

export const getHeadShot = (user)=>{
    var pic = "";
    if (!user.picture || user.picture===undefined || user.picture===null){
        return ( "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png") 
    }
   
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

// Arrow function for "Load from disk" button
/* export const handleLoadFromDisk = (setImage) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    };
    input.click();
 }; */
 
 export const handleLoadFromDisk = (setImage) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 600;
          const scaleFactor = maxWidth / image.width;
          const width = image.width * scaleFactor;
          const height = image.height * scaleFactor;
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
          const resizedImage = canvas.toDataURL('image/jpeg');
          setImage(resizedImage);
        };
      };
    };
    input.click();
  };


export const handlePasteImage = async (setImage) => {
    if ('clipboard' in navigator && 'read' in navigator.clipboard) {
        console.log("CLIPBOARD SUPPORTED")
      try {
        const clipboardItems = await navigator.clipboard.read();
        const imageItem = clipboardItems.find(item => item.types.includes('image/png') || item.types.includes('image/jpeg'));
        if (imageItem) {
          const file = await imageItem.getType('image/png' || 'image/jpeg');
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImage(reader.result);
          };
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Clipboard API not supported, try to read URL from clipboard text
      console.log("CLIPBOARD NOT SUPPORTED")
      const url = await navigator.clipboard.readText();
      if (/\.(png|jpe?g|gif)$/i.test(url)) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            setImage(reader.result);
          };
        } catch (error) {
          console.error(error);
        }
      }
    }
  };