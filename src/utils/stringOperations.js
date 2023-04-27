export const arrayFromString = (str, separator) =>{
    var newArray = str.split(separator)
    for (let i = 0; i < newArray.length; i++) {
      newArray[i] = newArray[i].trim();
      
    }
    return newArray;
}

export const findInString = (str, label)=>{
    return (str.includes(label))
}

export const replaceSpacesWithUnderscores= (str)=> {
    return str.replace(/\s+/g, '_');
  }
  
export const replaceUnderscoresWithSpaces=(str)=> {
    // replace underscores with spaces using a regular expression
    const result = str.replace(/_/g, ' ');
  
    return result;
  }

const getYouTubeID = (url)=> {
    // Remove any query parameters from the URL
    url = url.split('?')[0];
  
    // Extract the video ID from the URL
    let id;
    if (url.indexOf('youtu.be/') !== -1) {
      // Shortened URL format: https://youtu.be/{VIDEO_ID}
      id = url.split('youtu.be/')[1];
    } else {
      // Full URL format: https://www.youtube.com/watch?v={VIDEO_ID}&...
      id = url.split('v=')[1];
      if (id.indexOf('&') !== -1) {
        id = id.split('&')[0];
      }
    }
  
    return id;
  }

export const YoutubeLinkToIframeLink = (link)=>{
   //https://youtu.be/EXM3dTdm7Xk
  // https://www.youtube.com/watch?v=EXM3dTdm7Xk
  // https://www.youtube.com/embed/EXM3dTdm7Xk

  const id = getYouTubeID(link);
  var retorno = "https://www.youtube.com/embed/"+id;

  return retorno;

}

function extractIdAndSuffix(url) {
  const id = url.split('/').pop().split('_')[0];
  const suffix = url.split('_').pop().split('.')[0];
  return { id, suffix };
}

export const ExtractEmbedUrlWordWallFromImage = (image)=>{
console.log("IMAGEN EN EXTRACT FROM IMAGE", image)
  const { id, suffix } = extractIdAndSuffix(image);
  const embedUrl = "https://wordwall.net/embed/" + id +"?themeId="+suffix+"&templateId=3&fontStackId=0"

  return embedUrl;
}

