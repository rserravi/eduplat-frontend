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

export const YoutubeLinkToIframeLink = (link)=>{
   //https://youtu.be/EXM3dTdm7Xk
  // https://www.youtube.com/watch?v=EXM3dTdm7Xk
  // https://www.youtube.com/embed/EXM3dTdm7Xk

  var retorno = link;
  const mini = link.search("youtu.be");
  if (mini && mini !==-1){
    const id = link.substring(17, link.length);
    console.log("POS ES:", mini, id)
    retorno =  "https://www.youtube.com/embed/"+id;
  }

  const pos = link.search("v=");
  if (pos && pos!==-1){
    const id = link.substring(pos+2, link.length);
    console.log("POS ES:", pos, id)
    retorno =  "https://www.youtube.com/embed/"+id;
  }
  return retorno;

}

