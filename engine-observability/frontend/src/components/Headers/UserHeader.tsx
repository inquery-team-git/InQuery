import React from 'react';
import { Col, Container, Row } from 'reactstrap';

function UserHeader() {
  return (
    <>
      <div
        className="header pt-lg-8 d-flex align-items-center pb-8 pt-5"
        style={{
          // eslint-disable-next-line global-require
          backgroundImage: `url(${require('@/assets/images/theme/profile-cover.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10" style={{ minWidth: '300px' }}>
              <h1 className="display-2 text-white">Hello Jesse</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserHeader;
