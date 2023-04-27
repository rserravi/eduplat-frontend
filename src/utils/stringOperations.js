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
  let videoId = '';

  if (url.includes('youtu.be/')) {
    // Extract video ID from "youtu.be" links
    videoId = url.split('youtu.be/')[1];
  } else if (url.includes('watch?v=')) {
    // Extract video ID from "www.youtube.com" links
    videoId = url.split('watch?v=')[1];
  }

  // If the URL has additional query parameters, remove them
  if (videoId.includes('&')) {
    videoId = videoId.split('&')[0];
  }

  return videoId;
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

