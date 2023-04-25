export const getRootUrl = () => {
    console.log("ESTE ES PROTOCOL ",window.location.protocol)
    const protocol = window.location.protocol;
    var retorno ="";
    switch (protocol) {
        case "http:":
            retorno =  "http://13.39.99.41/api/v1"
            break;
        case "https:":
            retorno = "https://13.39.99.41/api/v1"
            break;
        default:
            retorno = "https://13.39.99.41/api/v1"
    }
    
    
    return(
        retorno
    )
}

export const getShareUrl = ()=>{
    console.log("ESTE ES PROTOCOL ",window.location.protocol)
    const protocol = window.location.protocol;
    var retorno ="";
    switch (protocol) {
        case "http:":
            retorno = "http://13.39.99.41/resources/"
            break;
        case "https:":
            retorno = "https://13.39.99.41/resources/"
            break;
        default:
            retorno = "https://13.39.99.41/resources/"
    }
    
    
    return(
        retorno
    )
}
