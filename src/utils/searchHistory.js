import { Button, Grid, IconButton} from '@mui/material';
import * as React from 'react'
import ClearIcon from '@mui/icons-material/Clear';


export class LocalBrowserHistory {

    contents = [];
    constructor (label, capacity, onClick, setFlag) {
        this.label = label;
        this.capacity = capacity;
        this.onClick = onClick;
        this.setFlag = setFlag;
        
    }
    
    contentFromStorage = ()=> {
        const localS = localStorage.getItem(this.label);
        if (localS !==null){
            this.contents = JSON.parse(localS);
        }
        
    }

    containsObject(obj, list) {
        for (var i = 0; i < list.length; i++) {
            //console.log("list[i]", list[i],"obj", obj);
            if (list[i] === obj) {
               
                return true;
            }
        }
    
        return false;
    }

    add(item) {
       // console.log("AÑADIENDO");
        this.contentFromStorage();

        if (!this.containsObject(item, this.contents)){

            if (this.contents.length===this.capacity){
                this.contents.shift();
            }

            this.contents.push(item);
            localStorage.setItem(this.label, JSON.stringify(this.contents));
        }
    }

    getContents() {
        this.contentFromStorage();
        return this.contents;
    }

    getContentsLength() {
        this.contentFromStorage();
        return this.contents.length;
    }

    deleteItem(item) {
        console.log("DELETING ITEM");
        this.contentFromStorage();
        let arr = this.contents;
        arr = arr.filter(newI => newI !== item)
        console.log("ESTO ES ARR",arr)
        this.contents = arr;
        localStorage.setItem(this.label, JSON.stringify(this.contents));
        
        console.log("CONTENIDO DESPUES DE BORRAR",this.contents)
        this.setFlag(true);
    }

    HistoryBar = () =>{
        
        return (
            <React.Fragment>
            <Grid 
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
            {this.getContentsLength()>0?<>
                {this.contents.map((item, index)=>{
                    return(
                    <React.Fragment key={index}>
                        
                            <IconButton onClick={(e)=>{e.preventDefault(); this.deleteItem(item)}} color='primary' size='small'><ClearIcon sx={{fontSize:12, mr:-0.5}}/></IconButton>
                            <Button size='small' onClick={this.onClick} sx={{ml:-0.5, fontSize:12, justifyContent:"flex-start" }}>
                            <i>{item}</i>
                            </Button>
                    
                    </React.Fragment>
                    )
                })}
            </>:<></>}
            </Grid>

        </React.Fragment>
        )
    }

}