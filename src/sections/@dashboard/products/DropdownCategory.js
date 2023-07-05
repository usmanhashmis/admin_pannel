import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownCategory({setCategory ,category}) {
  const [categories, setCategories] = React.useState('');

  const handleChange = (event) => {
    setCategory({ ...category, categoryWise: event.target.value });
    setCategories(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categories}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"Garments"}>Garments</MenuItem>
          <MenuItem value={"Electronics"}>Electronics</MenuItem>
          <MenuItem value={"Cosmentics"}>Cosmentics</MenuItem>
          <MenuItem value={"Gym"}>Gym</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}