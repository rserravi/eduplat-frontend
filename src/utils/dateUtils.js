export const longDate = (dateString) => {

    return(
        new Date(dateString).toLocaleDateString(undefined,{weekday:'long', year:'numeric', month:'long', day:'numeric'})
    )
}