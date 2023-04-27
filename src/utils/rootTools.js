export const getRootUrl = () => {
   
    const protocol = window.location.protocol;
    const retorno = protocol + "//13.39.99.41/api/v1"
    //console.log("ESTA ES LA ROOT URL",retorno)
    
    return(
        retorno
    )
}

export const getShareUrl = ()=>{
    //console.log("ESTE ES PROTOCOL ",window.location.protocol)
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    var retorno = protocol +"//"+  domain + "/resources/"
    return(
        retorno
    )
}

export const getShareProfileUrl = ()=>{
    //console.log("ESTE ES PROTOCOL ",window.location.protocol)
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    var retorno = protocol +"//"+  domain + "/user/"
    return(
        retorno
    )
}
