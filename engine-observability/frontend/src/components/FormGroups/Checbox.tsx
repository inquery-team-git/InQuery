import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from '@mui/material';
import { isObject } from 'lodash/fp';
import Link from 'next/link';
import { useState } from 'react';

import type { FormProps } from '@/types';

interface CheckboxGroupProps {
  config: FormProps;
}

function CheckboxGroup(props: CheckboxGroupProps) {
  const { title, items, action, value = [], onChange } = props.config;
  const [selected, setSelected] = useState<string[]>(value);

  const onCheckboxBtnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentItems = [...selected];
    const index = currentItems.indexOf(event.target.name);
    if (index < 0) {
      currentItems.push(event.target.name);
    } else {
      currentItems.splice(index, 1);
    }
    setSelected([...currentItems]);
    if (onChange) {
      onChange(undefined, [...currentItems]);
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
              style={{ cursor: 'pointer', marginRight: '15px' }}
            >
              <IconButton color="primary">{action.icon}</IconButton>
            </Link>
          )}
        </div>
      </div>
      <FormGroup>
        {items &&
          items.map((item) => {
            return (
              <FormControlLabel
                key={item.value}
                control={
                  <Checkbox
                    classes={{
                      root: 'iconCheck',
                      checked: 'checked',
                    }}
                    name={item.value}
                    onChange={onCheckboxBtnClick}
                  />
                }
                checked={selected.includes(item.value)}
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
      </FormGroup>
    </div>
  );
}

export default CheckboxGroup;
