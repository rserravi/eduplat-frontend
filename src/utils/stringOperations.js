export const arrayFromString = (str, separator) =>{
    var newArray = str.split(separator)
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

