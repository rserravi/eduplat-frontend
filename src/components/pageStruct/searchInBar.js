// imports
import * as React from 'react'
import { IconButton, Popover, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useNavigate } from 'react-router-dom';


export const SearchInBar = (props)=>{

  const [searchValue, setSearchValue] = useState("");
  const theme = createTheme(themeOptions);
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    const OnSearchClick = (event) =>{
      event.preventDefault();
      if (searchValue!==""){
        console.log (searchValue);
        setAnchorEl(null);
        navigate('/search/resources/'+searchValue)
      }
    }

    const OnSearchChange = (event) =>{
     //console.log(event.target.value);
      setSearchValue(event.target.value);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        // 👇 Get input value
        OnSearchClick(event);
      }
    };
    
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <IconButton  aria-describedby ={id} color="inversecommon"  onClick = {handleClick}>
            <SearchIcon fontSize="medium" />
          </IconButton>
          <Popover 
            id = {id}
            open = {open}
            anchorEl ={anchorEl}
            onClose= {handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="searchbar"
              label="Search resources"
              type="search"
              style = {{width: 300}} 
              variant="standard"
              sx={{m:2}}
              onChange={OnSearchChange}
              onKeyDown={handleKeyDown}
              onBlur={OnSearchClick}
            />
          </Popover>
        </ThemeProvider> 
      </React.Fragment>
    )
}