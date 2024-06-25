// src/components/AutocompleteField.js
import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const AutocompleteField = ({
  label,
  value,
  onChange,
  options,
  displayField,
}) => (
  <Autocomplete
    options={options}
    getOptionLabel={(option) => option[displayField] || ""}
    value={options.find((option) => option.id === value) || null}
    onChange={(event, newValue) =>
      onChange({ target: { value: newValue ? newValue.id : "" } })
    }
    renderInput={(params) => <TextField {...params} label={label} />}
  />
);

export default AutocompleteField;
