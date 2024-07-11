/* eslint-disable no-underscore-dangle */
import { isObject } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import AdminItem from '@/components/AdminItem';
import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import MemberInviteForm from '@/components/MemberInviteForm';
import type { MemberInviteParams } from '@/components/MemberInviteForm/MemberInvite';
import { inviteCompanyMembers } from '@/data/invite.data';
import {
  fetchCompanyMembers,
  updateCompanyMemberRole,
} from '@/data/member.data';
import Admin from '@/layouts/Admin';
import {
  getMembersList,
  getMemberStateError,
  isMemberStateLoading,
  setMemberNewRole,
  setMembersList,
  setMemberStateError,
  setMemberStateLoading,
} from '@/redux/admin/member.slice';
import { getRolesList } from '@/redux/admin/role.slice';
import { getAuthUserCompanyDetails } from '@/redux/auth/auth.slice';
import type { ErrorProps, MemberProfile } from '@/types';

function TeamPage() {
  const dispatch = useDispatch();
  const authenticatedCompany = useSelector(getAuthUserCompanyDetails);
  const members = useSelector(getMembersList);
  const roles = useSelector(getRolesList);
  const dataFetchedRef = useRef(false);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const isLoading = useSelector(isMemberStateLoading);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const error = useSelector(getMemberStateError);

  const onError = (err: string | ErrorProps) => {
    dispatch(setMemberStateError(isObject(err) ? err.message : err));
    dispatch(setMemberStateLoading(false));
  };

  const onFetchCompanyMembersSuccess = (data: MemberProfile[]) => {
    dispatch(setMembersList(data));
    dispatch(setMemberStateError(''));
    dispatch(setMemberStateLoading(false));
  };

  const handleFetchCompanyMembers = () => {
    dispatch(setMemberStateLoading(true));
    return fetchCompanyMembers().then(onFetchCompanyMembersSuccess, onError);
  };

  const onMemberRoleChangeSuccess = (data: any) => {
    dispatch(setMemberNewRole(data));
    dispatch(setMemberStateError(''));
    dispatch(setMemberStateLoading(false));
  };

  const handleMemberRoleChange = (userId: string, role: string) => {
    dispatch(setMemberStateLoading(true));
    return updateCompanyMemberRole(userId, role).then(
      onMemberRoleChangeSuccess,
      onError
    );
  };

  const onMemberInviteSuccess = () => {
    dispatch(setMemberStateError(''));
    dispatch(setMemberStateLoading(false));
  };

  const separateEmails = (str: string) => {
    const regex = /[\s,]+/;
    return str.trim().split(regex);
  };

  const handlememberInvite = (
    values: MemberInviteParams,
    callback: (value: string) => void
  ) => {
    dispatch(setMemberStateLoading(true));
    const emails = separateEmails(values.email);
    return inviteCompanyMembers({
      emails,
      roleId: values.role,
      companyId: authenticatedCompany._id,
    })
      .then(() => {
        onMemberInviteSuccess();
        callback('Invite Sent!');
      })
      .catch(onError);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleFetchCompanyMembers();
  }, []);

  return (
    <EnsureLoginRoute>
      <Admin>
        <Container style={{ maxWidth: 'none', padding: '0px' }}>
          <Col
            className="order-xl-1"
            xl="8"
            style={{ maxWidth: 'none', padding: '0px' }}
          >
            <Row className="align-items-center pl-3 pr-4 m-0">
              <Col xs="8" className="p-0">
                <h3 className="mb-0">Team</h3>
              </Col>
            </Row>
            <hr className="my-3 ml-3 mr-4" />
            <MemberInviteForm
              handleSubmit={handlememberInvite}
              error={'error'}
              processing={false}
              className="pl-3 pr-4"
              roles={roles}
            />
            <div className="align-items-center pl-3 pr-4 my-5">
              {members &&
                members.map((member, index) => (
                  <AdminItem
                    member={{ ...member, img: '' }}
                    roles={roles}
                    handleRoleChange={handleMemberRoleChange}
                    key={index}
                  />
                ))}
            </div>
          </Col>
        </Container>
      </Admin>
    </EnsureLoginRoute>
  );
}

export default TeamPage;
