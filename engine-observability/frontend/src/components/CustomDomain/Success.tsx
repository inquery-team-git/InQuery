/* eslint-disable no-underscore-dangle */
import CheckCircle from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { Col, Row } from 'reactstrap';

interface CustomDomainSuccessProps {
  deleteDomain: () => void;
  customDomain: string;
  processing?: boolean;
  error?: string;
}

function CustomDomainSuccess({
  deleteDomain,
  customDomain,
}: CustomDomainSuccessProps) {
  const onDomainDelete = () => {
    deleteDomain();
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
        <Alert severity="success">
          <AlertTitle>You have setup your custom domain.</AlertTitle>
          Providing you’ve setup your cname records correctly your custom domain
          will be working after the DNS propogation has completed
        </Alert>
        <Row style={{ maxWidth: '700px' }} className="mt-3">
          <Col>
            <p className="form-control-description">
              {
                'You have your custom domain setup your should be able to access it at '
              }
              <strong>{customDomain}</strong>
              {
                ' if you are have trouble accessing it please take a look at this instructions'
              }
            </p>
            <Alert
              icon={false}
              severity="warning"
              action={
                <Tooltip title="Remove">
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={onDomainDelete}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              }
              sx={{ mb: 2 }}
            >
              <p
                style={{
                  margin: '0px',
                  fontSize: '14px',
                  lineHeight: 'inherit',
                  color: '#5C5E72',
                  fontWeight: 600,
                  display: 'flex',
                }}
              >
                <CheckCircle fontSize="small" />
                <a
                  href={`https://${customDomain}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#5C5E72',
                    marginLeft: '10px',
                  }}
                >
                  {customDomain}
                </a>
              </p>
            </Alert>
            <p className="form-control-description">
              To change your custom url you will need to delete your current one
              first.
            </p>
            <hr className="my-4 mr-4" />
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CustomDomainSuccess;
