import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = debounce((e) => {
    onSearch(e.target.value);
  }, 500);

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e);
  };

  return (
    <div className="flex items-center space-x-2">
      <TextField
        label="Search for Movies"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleChange}
      />
      <IconButton onClick={() => setQuery("")} aria-label="clear">
        <ClearIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
