/* eslint-disable no-underscore-dangle */
import { capitalize, upperCase } from 'lodash';
import Image from 'next/image';
import React from 'react';
import { Col, Row } from 'reactstrap';

import type { MemberProfile, Role } from '@/types';

import SelectField from '../ReduxFields/SelectField';

interface AdminItemProps {
  member: MemberProfile;
  roles: Role[];
  handleRoleChange: (userId: string, role: string) => void;
}

function AdminItem({ member, roles, handleRoleChange }: AdminItemProps) {
  const companyAdminRole = roles.find((role) => role.name === 'COMPANY_ADMIN');
  const isDisabled = (option: string) => {
    return option === companyAdminRole?._id;
  };
  const name = `${member.firstName} ${member.lastName}`;

  const handleRoleUpdate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleRoleChange(member._id, event.target.value);
  };

  return (
    <Row style={{ maxWidth: '700px' }} className="justify-content-between mb-3">
      <Col style={{ flexGrow: 0 }} className="d-flex align-items-center">
        <Col className="pl-0" style={{ flexGrow: 0 }}>
          <Image
            alt="..."
            className="rounded-circle"
            style={{ width: '40px', height: '100%' }}
            src={member.img}
          />
        </Col>
        <Col style={{ fontSize: '15px' }}>
          <Row className="d-flex align-items-center font-weight-700 flex-row mb-1">
            {name}
          </Row>
          <Row style={{ color: '#666' }}>{member.email}</Row>
        </Col>
      </Col>
      <Col style={{ flexGrow: 0 }}>
        <SelectField
          name="role"
          value={member.role}
          onChange={handleRoleUpdate}
          placeholder={'Select Role'}
          options={roles.map((role) => ({
            text: capitalize(upperCase(role.name)),
            value: role._id,
          }))}
          disabled={isDisabled(member.role)}
        />
      </Col>
    </Row>
  );
}

export default AdminItem;
