/* eslint-disable no-underscore-dangle */
import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import type { Label } from '@/types';

import TextInput from '../ReduxFields/TextInput';
import type { CreateLabelParams } from './CreateLabels';
import validate from './validate';

interface LabelItemProps {
  label: Label;
  processing?: boolean;
  error?: string;
  handleLabelChange: (labelId: string, name: string) => void;
  handleDeleteLabel: (labelId: string) => void;
}

function LabelItem({
  label,
  handleLabelChange,
  handleDeleteLabel,
  processing,
}: LabelItemProps) {
  const [labelAction, setLabelAction] = useState(false);
  const [editing, setEditing] = useState(false);

  const showLabelEditing = () => {
    setEditing(true);
  };

  const closeLabelEditing = () => {
    setEditing(false);
  };

  const handleNameFormat = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let { value } = e.currentTarget;
    if (value.length > 0) {
      value = value.replace(/[^a-zA-Z ]/g, '');
    }
    return value;
  };

  const onSubmit = (values: CreateLabelParams) => {
    handleLabelChange(label._id, values.name);
    closeLabelEditing();
  };

  const onDelete = () => {
    handleDeleteLabel(label._id);
    closeLabelEditing();
  };

  return (
    <div key={label._id}>
      {editing && (
        <Formik
          initialValues={{ name: label.name }}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => {
            const isFormChanged = true;
            return (
              <Form>
                <Grid
                  container
                  className="m-0"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Grid item sm={12} md={9}>
                    <TextInput
                      name="name"
                      type="text"
                      className="textField"
                      inputProps={{
                        style: {
                          minHeight: '20px',
                        },
                      }}
                      inputStyle={{
                        width: '100%',
                        padding: '10px',
                      }}
                      style={{
                        margin: '0px',
                      }}
                      multiline
                      minRows={1}
                      placeholder="Create new label..."
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors.name && touched.name && Boolean(errors.name)
                      }
                      errorMsg={errors.name && touched.name && errors.name}
                      formatValue={handleNameFormat}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      color="primary"
                      className="submitButton"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        minHeight: '43px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16.5px',
                        lineHeight: '20px',
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                      }}
                      disabled={processing || !isFormChanged}
                      onClick={closeLabelEditing}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      color="primary"
                      className="submitButton"
                      disableFocusRipple
                      disableRipple
                      disableElevation
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        minHeight: '43px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16.5px',
                        lineHeight: '20px',
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                      }}
                      type="submit"
                      disabled={processing || !isFormChanged}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      )}
      {!editing && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onMouseEnter={() => setLabelAction(true)}
          onMouseLeave={() => setLabelAction(false)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{ fontSize: '15px', lineHeight: '22px' }}
            >{`${label.name} (${label.entryCount} entries)`}</div>
            <div
              style={{
                fontSize: '12px',
                lineHeight: '17px',
                color: '#888',
              }}
            >{`ID: ${label.urlName}`}</div>
          </div>
          <div
            style={{
              display: labelAction ? 'flex' : 'none',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                marginLeft: '20px',
                color: '#2AAF66',
                cursor: 'pointer',
                fontSize: '15px',
                lineHeight: '22px',
                transition: 'all .1s ease-in-out',
                userSelect: 'none',
              }}
              onClick={showLabelEditing}
            >
              Rename
            </div>
            <div
              style={{
                marginLeft: '20px',
                color: '#2AAF66',
                cursor: 'pointer',
                fontSize: '15px',
                lineHeight: '22px',
                transition: 'all .1s ease-in-out',
                userSelect: 'none',
              }}
              onClick={onDelete}
            >
              Delete
            </div>
          </div>
        </div>
      )}
      <hr className="my-3" />
    </div>
  );
}

export default LabelItem;
