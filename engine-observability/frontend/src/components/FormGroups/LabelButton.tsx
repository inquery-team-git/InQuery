import { IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import classNames from 'classnames';
import { isObject } from 'lodash/fp';
import Link from 'next/link';
import { useState } from 'react';

import type { FormProps } from '@/types';

interface LabelButtonGroupProps {
  config: FormProps;
}

function LabelButtonGroup(props: LabelButtonGroupProps) {
  const { title, items, action, value = [], onChange } = props.config;
  const [selected, setSelected] = useState<string[]>(value);

  const onCheckboxBtnClick = (item: string) => {
    const currentItems = [...selected];
    const index = currentItems.indexOf(item);
    if (index < 0) {
      currentItems.push(item);
    } else {
      currentItems.splice(index, 1);
    }
    setSelected([...currentItems]);
    if (onChange) {
      onChange([...currentItems]);
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
      <div className="lables">
        {items &&
          items.map((item) => {
            return (
              <Chip
                key={item.value}
                label={item.text}
                className={classNames('chip', {
                  selectedChip: selected.includes(item.value),
                })}
                onClick={() => onCheckboxBtnClick(item.value)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default LabelButtonGroup;
