// src/components/SelectField.js
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectField = ({ label, value, onChange, options, displayField }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange} displayEmpty>
      <MenuItem value="">
        <em>{label}</em>
      </MenuItem>
      {options.map(option => (
        <MenuItem key={option.id || option.numeric || option.ecode || option.ocode} value={option.id || option.numeric || option.ecode || option.ocode}>
          {option[displayField] || option.name || option.ename || option.oname}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;
