export const getRootUrl = () => {
   
    const protocol = window.location.protocol;
    const retorno = protocol + "//eduplat.org.es/api/v1"
    //console.log("ESTA ES LA ROOT URL",retorno)
    
    return(
        retorno
    )
}

export const getShareUrl = ()=>{
    //console.log("ESTE ES PROTOCOL ",window.location.protocol)
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    var port = window.location.port;
    if (port){
        port = ":"+port
    }
    var retorno = protocol +"//"+  domain + port + "/resources/"
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
