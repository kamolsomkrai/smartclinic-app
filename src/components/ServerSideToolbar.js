// src/components/ServerSideToolbar.js
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ServerSideToolbar = ({ value, clearSearch, onChange }) => {
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        value={value}
        onChange={onChange}
        placeholder="Search…"
        variant="outlined"
        size="small"
        sx={{ mr: 2 }}
      />
      <Button onClick={clearSearch} variant="outlined" color="primary">
        Clear
      </Button>
    </Box>
  );
};

export default ServerSideToolbar;
