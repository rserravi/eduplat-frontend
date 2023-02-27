// imports

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


export const SearchInBar = (props)=>{
    
    return (
        <TextField color="inversecommon"
        sx={{ input: { color: 'white' } }}
        size='small'
        focused
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton color="inversecommon">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      /> 
    )
}