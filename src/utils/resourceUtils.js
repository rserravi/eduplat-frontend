
export const imagePlaceholders ={
    PDF : "https://www.plainsag.com/siteart/pdf-placeholder.jpg",
    Youtube : "https://user-images.githubusercontent.com/624760/37563029-288df044-2a6f-11e8-96bb-cba866417a7c.jpg",
    Vimeo : "https://i.vimeocdn.com/video/656988822_960.jpg",
    Website: "https://lms.redvector.com/lpe/assets/core/img/large-placeholder-course.png"
}

const removeStrangeChars= str => {

    var newString = "";
    for (let i = 0; i< str.length; i++) {
      const character = str[i].toLowerCase();
      var newChar= character
      if (character ==="à" || character==='á' || character === 'ä'){
        newChar = 'a'
      }

      if (character ==="è" || character==='é' || character === 'ë'){
        newChar = 'e'
      }

      if (character ==="ì" || character==='í' || character === 'ï'){
        newChar = 'i'
      }

      if (character ==="ò" || character==='ó' || character === 'ö'){
        newChar = 'o'
      }

      if (character ==="ù" || character==='ú' || character === 'ü'){
        newChar = 'u'
      }

      if (character ==="ñ"){
        newChar = 'ny'
      }

      if (character ==="ç"){
        newChar = 's'
      }

      newString+=newChar;
    }

    return newString;
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