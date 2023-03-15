export const arrayFromString = (str, separator) =>{
    var newArray = str.split(separator);
    return newArray;
}

export const findInString = (str, label)=>{
    return (str.includes(label))
}