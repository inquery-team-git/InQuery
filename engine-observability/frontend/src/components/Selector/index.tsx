import { capitalize } from 'lodash/fp';
import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

interface SelectorProps {
  options: string[];
  isDisabled: (value: string) => boolean;
  defaultValue: string;
}
function Selector(props: SelectorProps) {
  const { options = [], isDisabled, defaultValue = '' } = props;
  const [open, setOpen] = useState(false);
  const [selectedRole, setRole] = useState(defaultValue);

  const toggle = () => {
    setOpen(!open);
  };

  const handleRoleChange = (e: any) => {
    setRole(e);
  };

  return (
    <ButtonDropdown
      isOpen={open && !isDisabled(defaultValue)}
      toggle={toggle}
      style={{
        minWidth: '137px',
        opacity: isDisabled(defaultValue) ? 0.5 : 1,
      }}
      disabled={isDisabled(defaultValue)}
    >
      <DropdownToggle caret>{capitalize(selectedRole)}</DropdownToggle>
      <DropdownMenu>
        {options.map((option, i) => (
          <DropdownItem
            key={i}
            onClick={() => handleRoleChange(option)}
            active={selectedRole === option}
          >
            {capitalize(option)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Selector;
