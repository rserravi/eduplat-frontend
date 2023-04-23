
export const imagePlaceholders ={
    PDF : "https://www.plainsag.com/siteart/pdf-placeholder.jpg",
    Youtube : "https://user-images.githubusercontent.com/624760/37563029-288df044-2a6f-11e8-96bb-cba866417a7c.jpg",
    Vimeo : "https://i.vimeocdn.com/video/656988822_960.jpg",
    Website: "https://lms.redvector.com/lpe/assets/core/img/large-placeholder-course.png"
}

const removeStrangeChars= str => {
    const letters = /^[a-zA-Z0-9]+$/

    let id = ''
      // iterate through each letters
      for (var i = 0; i < str.length; i++) {
        if (str[i].match(letters) ) {
          id += str[i]
        } else {
          // In case you want to replace with something else
          id += '-'  
        }
      }
      return id;
      

    //return newString;
}

export const getResourceUrlFromTitle = (title) =>{
    let result = title.replace(/\s/g,"-");
    result = result.toLowerCase();
    result = removeStrangeChars(result);
    //TODO: Comprobar que no existe ya en basedatos.
    return result;
}

export const setPictureInResource = (pictureUrl, type) =>{
    console.log(pictureUrl, type)
    if (!pictureUrl || pictureUrl===undefined || pictureUrl===null){
        switch (type) {
            case "PDF":
                return imagePlaceholders.PDF; 
            case "Youtube":
                return imagePlaceholders.Youtube;
            case "Vimeo":
                return imagePlaceholders.Vimeo
        
            default:
                return imagePlaceholders.Website
        }
    }
    else 
    return pictureUrl;
}