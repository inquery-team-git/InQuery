import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';

const TextInput = (props: any) => (
  <FormControl
    style={{ margin: '0 0 17px', width: '100%', ...props.style }}
    className={props.className}
  >
    {props.label && (
      <InputLabel htmlFor="outlined-adornment-password">
        {props.label}
      </InputLabel>
    )}
    <OutlinedInput
      fullWidth={props.fullWidth}
      name={props.name}
      label={props.label}
      type={props.type}
      value={props.value}
      onChange={(e) => {
        if (props.formatValue) {
          e.currentTarget.value = props.formatValue(e);
        }
        props.onChange(e);
      }}
      multiline={props.multiline}
      minRows={props.minRows}
      placeholder={props.placeholder}
      disabled={props.disabled}
      inputProps={props.inputProps}
      className={props.inputClassName}
      startAdornment={props.startAdornment}
      endAdornment={props.endAdornment}
      style={{ margin: '0px', ...props.inputStyle }}
      error={props.error}
      autoFocus={props.autoFocus}
      onFocus={props.onFocus}
      classes={props.classes}
    />
    {props.errorMsg && (
      <FormHelperText className="text-danger" style={{ marginLeft: '0px' }}>
        {props.errorMsg}
      </FormHelperText>
    )}
  </FormControl>
);

export default TextInput;
