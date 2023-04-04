export const getHeadShot = (user)=>{
    var pic = "";
   
    if (user.picture.type ==="link"){
        if (user.picture.fileName !==null ||user.picture.fileName !==undefined || user.picture.fileName !==""){
            pic = user.picture.fileName
        }
       
    }
    else {
        pic = user.picture.file;
    }
    if (pic===""){
        pic = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    }

    console.log("PICTURE EN getHeadShot",pic)

    return pic;
}