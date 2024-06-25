// src/components/CustomTextField.js
import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, placeholder, ...props }) => (
  <TextField fullWidth label={label} placeholder={placeholder} {...props} />
);

export default CustomTextField;
