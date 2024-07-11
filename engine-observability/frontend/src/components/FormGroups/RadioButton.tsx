import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from '@mui/material';
import { isObject } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';

import type { FormProps } from '@/types';

interface RadioButtonGroupProps {
  config: FormProps;
}

function RadioButtonGroup(props: RadioButtonGroupProps) {
  const { title, items, action, value, onChange, name } = props.config;
  const [selected, setSelected] = useState<string>(value);

  const onCheckboxBtnClick = (event: any, item: string) => {
    setSelected(item);
    if (onChange) {
      onChange(event, item);
    }
  };

  return (
    <div className="sidebarSection">
      <div className="header">
        <div className="title">{title}</div>
        <div className="action">
          {action && isObject(action) && (
            <Link
              href={action.url}
              style={{ cursor: 'pointer' }}
              className="p-0"
            >
              <IconButton color="primary">{action.icon}</IconButton>
            </Link>
          )}
        </div>
      </div>
      <FormControl sx={{ m: 1, minWidth: 200, margin: '0px' }}>
        <RadioGroup value={selected} onChange={onCheckboxBtnClick} name={name}>
          {items &&
            items.map((item) => {
              return (
                <FormControlLabel
                  key={item.value}
                  control={
                    <Radio
                      classes={{
                        root: 'iconCheck',
                        checked: 'checked',
                      }}
                    />
                  }
                  value={item.value}
                  label={item.text}
                  className="checkboxInput"
                  style={{
                    margin: '0px',
                    marginLeft: '-4px',
                  }}
                  classes={{
                    label: 'checkboxLabel',
                  }}
                />
              );
            })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioButtonGroup;
