import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { Fragment } from 'react';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value: any) => any;
  sorting?: boolean;
  sorted?: boolean;
  orderBy?: string;
  order?: OrderTypes;
  handleSorting?: () => void;
}

export enum OrderTypes {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface MuiTableProps {
  title?: string;
  rows: Record<string, any>[];
  columns: Column[];
  pagination?: boolean;
  loading?: boolean;
  handlePageChange?: (page: number) => void;
}

export default function MuiTable(props: MuiTableProps) {
  const {
    rows = [],
    columns = [],
    title,
    pagination = false,
    loading = false,
  } = props;
  const [page, setPage] = React.useState(1);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
    if (props.handlePageChange) {
      props.handlePageChange(newPage);
    }
  };

  return (
    <Paper
      sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px' }}
      elevation={0}
    >
      {title && (
        <h2 style={{ marginLeft: '16px', marginTop: '10px' }}>{title}</h2>
      )}
      {rows.length === 0 && !loading && (
        <p
          style={{ marginLeft: '16px', marginTop: '10px', textAlign: 'center' }}
        >
          {'No Record found!'}
        </p>
      )}
      {rows.length === 0 && loading && (
        <p
          style={{ marginLeft: '16px', marginTop: '10px', textAlign: 'center' }}
        >
          {'Loading list...'}
        </p>
      )}
      {rows.length > 0 && (
        <Fragment>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                      {column.sorting && column.handleSorting && (
                        <IconButton onClick={column.handleSorting}>
                          <KeyboardArrowDownIcon
                            sx={{
                              fill: column.sorted ? '#525151' : '#D9D9D9',
                              transform:
                                column.order === OrderTypes.DESC
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)',
                            }}
                          />
                        </IconButton>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={`${column.id}_${row.id}`}
                            align={column.align}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {pagination && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '15px',
              }}
            >
              <Pagination
                count={10}
                shape="rounded"
                onChange={handlePageChange}
                page={page}
              />
            </div>
          )}
        </Fragment>
      )}
    </Paper>
  );
}
