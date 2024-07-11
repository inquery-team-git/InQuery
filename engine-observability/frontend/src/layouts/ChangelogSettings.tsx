import type { ReactNode } from 'react';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import NavList from '@/components/NavList';

import { changeLogRoutes } from './routes';

interface ChangelogSettingsProps {
  children: ReactNode;
}

function ChangelogSettings(props: ChangelogSettingsProps) {
  return (
    <>
      <Container style={{ maxWidth: 'none', padding: '0px' }}>
        <Col
          className="order-xl-1"
          xl="8"
          style={{ maxWidth: 'none', padding: '0px' }}
        >
          <Row className="align-items-center pl-3 pr-4 m-0">
            <Col xs="8" className="p-0">
              <h3 className="mb-0">Changelog Settings</h3>
            </Col>
          </Row>
          <hr className="my-3 ml-3 mr-4" />
          <Row className="pl-3 pr-4 m-0">
            <Col xs="2" className=" no-box-shadow navbar-vertical">
              <NavList routes={changeLogRoutes} />
            </Col>
            <Col>{props.children}</Col>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default ChangelogSettings;
