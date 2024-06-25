// src/components/SearchBar.js
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ searchText, handleSearch }) => (
  <TextField
    variant='outlined'
    size='small'
    placeholder='Search…'
    value={searchText}
    onChange={handleSearch}
    InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
          <SearchIcon className='text-gray-500' />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position='end'>
          <IconButton
            size='small'
            onClick={() => handleSearch({ target: { value: "" } })}
            className='text-gray-500'
            aria-label='clear'
          >
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    className='w-72'
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        "& fieldset": {
          borderColor: "#e0e0e0",
          borderWidth: "1px",
        },
        "&:hover fieldset": {
          borderColor: "#bdbdbd",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#9e9e9e",
        },
        "&.MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
      "& .MuiInputBase-input": {
        padding: "10px 14px",
      },
    }}
  />
);

export default SearchBar;
