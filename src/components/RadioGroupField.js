// src/components/RadioGroupField.js
import React from "react";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioGroupField = ({ label, value, onChange, options }) => (
  <FormControl>
    <FormLabel id={label}>{label}</FormLabel>
    <RadioGroup
      row
      aria-label={label}
      name={label}
      value={value}
      onChange={onChange}
      defaultValue={options[0]?.value}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioGroupField;
