import { themeOptions } from "src/theme/theme"

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
        secondaryText:"#2C3F59",
        pictureHeader: "url(/images/headers/iso-republic-moonlight-through-tree-branches.jpg)"
    },
    {
        key:1,
        name: "Greener than grass",
        primaryColor: "#2D4A11",
        secondaryColor:"#94B623",
        primaryText:"#b3b8cd",
        secondaryText:"#1f1a32",
        pictureHeader: "url(/images/headers/iso-republic-leaf-macro-02.jpg)"
    },
    {
        key:2,
        name: "Woody Good",
        primaryColor: "#735646",
        secondaryColor:"#F2C8A2",
        primaryText:"#b3b8cd",
        secondaryText:"#0D0D0D",
        pictureHeader: "url(/images/headers/iso-republic-stacked-split-wood.jpg)",
    },
    {
        key:3,
        name: "Sorcery",
        primaryColor: "#D1A0F2",
        secondaryColor:"#7C1ED9",
        primaryText:"#b3b8cd",
        secondaryText:"#CDCCD9",
        pictureHeader: "url(/images/headers/iso-republic-neon-abstract-background-10.jpg)",
    },
    {
        key:4,
        name: "Clean technology",
        primaryColor: "#D8D9D7",
        secondaryColor:"#58594F",
        primaryText:"#b3b8cd",
        secondaryText:"#F0F2F2",
        pictureHeader: "url(/images/headers/iso-republic-keyboard-notepad-mouse.jpg)",
    },

    {
        key:5,
        name: "Yellowart",
        primaryColor: "#F2CD5C",
        secondaryColor:"#038C3E",
        primaryText:"#b3b8cd",
        secondaryText:"#F2F0D5",
        pictureHeader: "url(/images/headers/iso-republic-art-supplies-02.jpg)",
    },
    {
        key:100
    },
    {
        key:1000,
        name: "ThemeDefault",
        primaryColor: themeOptions.palette.primary.main,
        secondaryColor:themeOptions.palette.secondary.main,
        primaryText:themeOptions.palette.text.primary,
        secondaryText:themeOptions.palette.text.secondary,
        pictureHeader: "url(/images/headers/iso-republic-moonlight-through-tree-branches.jpg)"
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