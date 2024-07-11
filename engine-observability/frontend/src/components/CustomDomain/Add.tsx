/* eslint-disable no-underscore-dangle */
import { Alert } from '@mui/material';
import React from 'react';
import { Col, Row } from 'reactstrap';

import CustomDomainForm from '@/components/CustomDomainForm';
import type { CustomDomainParams } from '@/components/CustomDomainForm/CustomDomain';

interface CustomDomainAddPros {
  subdomain: string;
  customDomain?: string;
  addDomain: (values: CustomDomainParams) => void;
  initialValues: CustomDomainParams;
  processing?: boolean;
  error?: string;
}

function CustomDomainAdd({
  subdomain,
  addDomain,
  processing,
  error,
  initialValues,
}: CustomDomainAddPros) {
  const onDomainAdd = (values: CustomDomainParams) => {
    addDomain(values);
  };

  return (
    <Col
      className="order-xl-1"
      xl="8"
      style={{ maxWidth: 'none', padding: '0px' }}
    >
      <Row className="align-items-center pl-3 pr-4 m-0">
        <Col xs="8" className="p-0">
          <h3 className="mb-0">Custom Domains</h3>
          <h4 className="mb-0" style={{ fontWeight: 500 }}>
            Set up redirects to your preferred domains
          </h4>
        </Col>
      </Row>
      <hr className="my-3 ml-3 mr-4" />
      <div className="align-items-center pl-3 pr-4 m-0">
        <Row style={{ maxWidth: '700px' }} className="mt-3">
          <Col>
            <p className="form-control-description">
              {`We've created `}
              <span
                style={{ fontWeight: 500 }}
              >{`${subdomain}.inquery.io`}</span>
              {` for you. With custom domains, you can use your own website (`}
              <span style={{ fontWeight: 500 }}>
                {'changelog.yoursite.com'}
              </span>
              {') instead.'}
              {' Just add the domain below then follow these instructions'}
            </p>
            <Alert severity="warning">
              Important: Before you add your domain below you need to add your
              cname record with your domain provider first.
            </Alert>
            <hr className="my-4 mr-4" />
            <CustomDomainForm
              processing={processing}
              error={error}
              handleSubmit={onDomainAdd}
              initialValues={initialValues}
            />
            <hr className="my-4 mr-4" />
            <Alert severity="info">
              <p
                style={{
                  margin: '0px',
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                }}
              >
                {'Make sure you point to '}
                <span style={{ fontWeight: 500 }}>cname.inquery.io</span>
                {' in your DNS settings.'}
              </p>
              <br></br>
              Please follow the steps in this support article to setup your
              custom domain, it may take up to 48 hours for DNS changes to
              propagate throughout the Internet.
            </Alert>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CustomDomainAdd;
