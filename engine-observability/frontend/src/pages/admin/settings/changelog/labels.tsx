/* eslint-disable no-underscore-dangle */
import { isObject, startCase, trim } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, FormGroup, Row } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import CreateLabelForm from '@/components/Labels/CreateLabelForm';
import type { CreateLabelParams } from '@/components/Labels/CreateLabels';
import LabelItem from '@/components/Labels/LabelItem';
import {
  createNewLabel,
  deleteLabel,
  getAllLabels,
  updateLabelData,
} from '@/data/labels.data';
import Admin from '@/layouts/Admin';
import ChangelogSettings from '@/layouts/ChangelogSettings';
import {
  getLabelsList,
  getLabelStateError,
  isLabelStateLoading,
  removeLabel,
  setLabelsList,
  setLabelStateError,
  setLabelStateLoading,
  setNewLabel,
  updateLabel,
} from '@/redux/admin/labels.slice';
import type { ErrorProps, Label } from '@/types';

function ChangelogLabels() {
  const dispatch = useDispatch();
  const labels = useSelector(getLabelsList);
  const dataFetchedRef = useRef(false);
  const isLoading = useSelector(isLabelStateLoading);
  const error = useSelector(getLabelStateError);

  const onError = (err: string | ErrorProps) => {
    dispatch(setLabelStateError(isObject(err) ? err.message : err));
    dispatch(setLabelStateLoading(false));
  };

  const onFetchCompanyLabelsSuccess = (data: Label[]) => {
    dispatch(setLabelsList(data));
    dispatch(setLabelStateError(''));
    dispatch(setLabelStateLoading(false));
  };

  const handleFetchCompanyLabels = () => {
    dispatch(setLabelStateLoading(true));
    return getAllLabels().then(onFetchCompanyLabelsSuccess, onError);
  };

  const onUpdateLabelSuccess = (data: any) => {
    dispatch(updateLabel(data));
    dispatch(setLabelStateError(''));
    dispatch(setLabelStateLoading(false));
  };

  const handleLabelChange = (labelId: string, name: string) => {
    dispatch(setLabelStateLoading(true));
    return updateLabelData(labelId, { name }).then(
      onUpdateLabelSuccess,
      onError
    );
  };

  const onDeleteLabelSuccess = (data: any) => {
    dispatch(removeLabel(data));
    dispatch(setLabelStateError(''));
    dispatch(setLabelStateLoading(false));
  };

  const handleDeleteLabel = (labelId: string) => {
    dispatch(setLabelStateLoading(true));
    return deleteLabel(labelId).then(onDeleteLabelSuccess, onError);
  };

  const onNewLabelSuccess = (data: any) => {
    dispatch(setNewLabel(data));
    dispatch(setLabelStateError(''));
    dispatch(setLabelStateLoading(false));
  };

  const handleCreateNewLabel = (data: CreateLabelParams) => {
    dispatch(setLabelStateLoading(true));
    return createNewLabel({ name: startCase(trim(data.name)) }).then(
      onNewLabelSuccess,
      onError
    );
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleFetchCompanyLabels();
  }, []);

  return (
    <EnsureLoginRoute>
      <Admin>
        <ChangelogSettings>
          <Row style={{ maxWidth: '600px' }}>
            <Col>
              <FormGroup className="mb-0">
                <label className="form-control-label">
                  Labels look like this
                </label>
                <p className="form-control-description">
                  You can add labels to changelog entries to specify which part
                  of your product is being changed. Labels are public-facing,
                  and can be used to filter down the list view.
                </p>

                <CreateLabelForm
                  handleSubmit={handleCreateNewLabel}
                  processing={isLoading}
                  error={error}
                />
                <hr className="my-3" />
                <div>
                  {labels.map((label) => (
                    <LabelItem
                      key={label._id}
                      label={label}
                      handleLabelChange={handleLabelChange}
                      handleDeleteLabel={handleDeleteLabel}
                      processing={isLoading}
                      error={error}
                    />
                  ))}
                </div>
              </FormGroup>
            </Col>
          </Row>
        </ChangelogSettings>
      </Admin>
    </EnsureLoginRoute>
  );
}

export default ChangelogLabels;
