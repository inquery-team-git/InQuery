import { isObject } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import ChangelogPrivacyForm from '@/components/ChangelogPrivacyForm';
import type { ChangelogPrivacyParams } from '@/components/ChangelogPrivacyForm/ChangelogPrivacy';
import {
  fetchChangelogSettings,
  updateChangelogSettings,
} from '@/data/changelog-settings.data';
import Admin from '@/layouts/Admin';
import ChangelogSettings from '@/layouts/ChangelogSettings';
import {
  getChangelogSettings,
  getChangelogSettingStateError,
  isChangelogSettingStateLoading,
  setChangelogSettings,
  setChangelogSettingStateError,
  setChangelogSettingStateLoading,
  setUpdatedChangelogSettings,
} from '@/redux/admin/changelog-settings.slice';
import { getAuthUserDetails } from '@/redux/auth/auth.slice';
import type { ChangelogSetting, ErrorProps } from '@/types';

function ChangelogPrivacy() {
  const dispatch = useDispatch();
  const loggedinUser = useSelector(getAuthUserDetails);
  const changelogSettings = useSelector(getChangelogSettings);
  const dataFetchedRef = useRef(false);
  const isLoading = useSelector(isChangelogSettingStateLoading);
  const error = useSelector(getChangelogSettingStateError);

  const onError = (err: string | ErrorProps) => {
    dispatch(setChangelogSettingStateError(isObject(err) ? err.message : err));
    dispatch(setChangelogSettingStateLoading(false));
  };

  const onFetchCompanyMembersSuccess = (data: ChangelogSetting) => {
    dispatch(setChangelogSettings(data));
    dispatch(setChangelogSettingStateError(''));
    dispatch(setChangelogSettingStateLoading(false));
  };

  const handleFetchChangelogSettings = () => {
    dispatch(setChangelogSettingStateLoading(true));
    return fetchChangelogSettings(loggedinUser.companyId).then(
      onFetchCompanyMembersSuccess,
      onError
    );
  };

  const onUpdateSettingsSuccess = (data: ChangelogSetting) => {
    dispatch(setUpdatedChangelogSettings(data));
    dispatch(setChangelogSettingStateError(''));
    dispatch(setChangelogSettingStateLoading(false));
  };

  const separateDomains = (str: string) => {
    const regex = /[\s,]+/;
    return str.trim().split(regex);
  };

  const handlePrivacyChange = (values: ChangelogPrivacyParams) => {
    dispatch(setChangelogSettingStateLoading(true));
    const allowedDomains = separateDomains(values.domains);
    const requestData = {
      private: values.type === 'private',
      allowedDomains,
      allowIdentified: values.allowIdentified,
    };
    return updateChangelogSettings(loggedinUser.companyId, requestData).then(
      onUpdateSettingsSuccess,
      onError
    );
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleFetchChangelogSettings();
  }, []);

  return (
    <EnsureLoginRoute>
      <Admin>
        <ChangelogSettings>
          <Row style={{ maxWidth: '600px' }}>
            <Col>
              <ChangelogPrivacyForm
                processing={isLoading}
                error={error}
                handleSubmit={handlePrivacyChange}
                initialValues={
                  {
                    type: changelogSettings.private ? 'private' : 'public',
                    allowIdentified: changelogSettings.allowIdentified,
                    domains: changelogSettings.allowedDomains?.join(', '),
                    allowedDomains: changelogSettings.allowedDomains,
                  } as ChangelogPrivacyParams
                }
              />
            </Col>
          </Row>
        </ChangelogSettings>
      </Admin>
    </EnsureLoginRoute>
  );
}

export default ChangelogPrivacy;
