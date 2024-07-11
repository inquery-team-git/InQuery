import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

const SelectField = (props: any) => (
  <FormControl
    sx={{ m: 1, minWidth: 200, margin: '0px' }}
    style={{ ...props.style }}
    className={props.className}
  >
    {props.label && (
      <InputLabel htmlFor="outlined-adornment-password">
        {props.label}
      </InputLabel>
    )}
    <Select
      displayEmpty
      value={props.value}
      onChange={props.onChange}
      style={{ height: props.height || '48px' }}
      name={props.name}
      error={props.error}
      disabled={props.disabled}
      onFocus={props.onFocus}
      variant={props.variant || 'outlined'}
      disableUnderline={props.disableUnderline}
    >
      {props.placeholder && (
        <MenuItem disabled value="">
          <em>{props.placeholder}</em>
        </MenuItem>
      )}
      {props.options &&
        props.options.map((option: Record<string, string>) => (
          <MenuItem value={option.value} key={option.value}>
            {option.icon} {option.text}
          </MenuItem>
        ))}
    </Select>
    {props.errorMsg && (
      <FormHelperText className="text-danger">{props.errorMsg}</FormHelperText>
    )}
  </FormControl>
);

export default SelectField;
