import Breadcrumbs from '@mui/material/Breadcrumbs';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import * as React from 'react';

import SelectField from '../ReduxFields/SelectField';

const StyledBreadcrumb = styled((props: ChipProps) => <Chip {...props} />)(
  ({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      padding: '14px 5px',
      backgroundColor: emphasize(backgroundColor, 0.7),
      height: theme.spacing(3),
      color: '#fff',
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.5),
        color: '#fff',
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 1),
      },
    };
  }
) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs(props: any) {
  const { crumbs = [] } = props;
  const [showSelect, setShowSelect] = React.useState(false);

  const toggleSelector = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setShowSelect(!showSelect);
  };

  return (
    <div role="presentation" style={{ margin: '10px 0' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map((crumb: any) => {
          return (
            <StyledBreadcrumb
              key={crumb.label}
              component="a"
              href={crumb.href}
              label={crumb.label}
              icon={crumb.startIcon}
              disabled={crumb.disabled}
              deleteIcon={crumb.endIcon}
              onDelete={
                crumb.actions &&
                crumb.actions.length &&
                crumb.actions.includes('select')
                  ? toggleSelector
                  : undefined
              }
              style={{
                cursor: crumb.disabled ? 'default' : 'pointer',
              }}
            />
          );
        })}
        {showSelect && (
          <SelectField
            name="time_period"
            options={props.selectOptions}
            style={{ minWidth: '157px' }}
            onChange={props.onSelectItem}
            height="28px"
            value=""
            placeholder={props.selecPlaceholder}
          />
        )}
      </Breadcrumbs>
    </div>
  );
}
