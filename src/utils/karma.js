export const karmaAndLevel = [
    {
        karma: 0,
        level: "enthusiastic newbie",
        maxPalette: 2
    },
    {
        karma: 250,
        level: "curious explorer",
        maxPalette: 3,
    },
    {
        karma: 500,
        level: "publication hunter",
        maxPalette: 4,
    },
    {
        karma: 1000,
        level: "publication master",
        maxPalette: 5,
    },
    {
        karma: 2000,
        level: "publication ninja",
        maxPalette: 6,
    },
    {
        karma: 2500,
        level: "Eduplatter boss",
        maxPalette: 100
    },
    {
        karma: 4000,
        level: "Eduplatter magician",
        maxPalette: 100
    },
    {
        karma: 5500,
        level: "Eduplatter legend",
        maxPalette: 100
    },
    {
        karma: 6000,
        level: "Eduplatter master",
        maxPalette: 100
    },
    {
        karma: 8000,
        level: "Eduplatter supreme master",
        maxPalette: 100
    },
    {
        karma: 10000,
        level: "Eduplatter deity",
        maxPalette: 100
    },

]

//key 100 indica "custom", y se lee de la base de datos.

export const karmaPalettes = [
    {
        key:0,
        name: "Dark Night",
        primaryColor: "#231e39",
        secondaryColor:"#b3b8cd",
        primaryText:"#b3b8cd",
        secondaryText:"#1f1a32",
        pictureHeader: "https://images.unsplash.com/photo-1540228232483-1b64a7024923?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80)"
    },
    {
        key:100
    }
]

export const karmaLevel = (karma)=>{
    var result = "Eduplatter deity"
    for (let index = 0; index < karmaAndLevel.length; index++) {
        if (karmaAndLevel[index].karma <= karma) {
            result = karmaAndLevel[index].level
        }       
    }
    return result
}