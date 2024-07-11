/* eslint-disable tailwindcss/no-custom-classname */
import classNames from 'classnames';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import React, { useRef } from 'react';
import { Button, Col, Row } from 'reactstrap';

interface ImageUploadProps {
  source: string | StaticImageData;
  label?: string;
  size?: string;
  ratio?: string;
  imgClassName?: string;
  className?: string;
}
const ImageUpload = ({
  source,
  label,
  size,
  ratio,
  imgClassName,
  className,
}: ImageUploadProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <Row className={classNames('mb-4', className)}>
      <Col xs="2" style={{ maxWidth: '82px' }}>
        <Image
          alt="..."
          className={imgClassName}
          style={{ width: '50px', height: '100%' }}
          src={source}
        />
      </Col>
      <Col className="d-flex align-items-center fileInput grow-0 p-0">
        <Button
          color="default"
          outline
          onClick={() =>
            inputFileRef && inputFileRef.current && inputFileRef.current.click()
          }
          size="sm"
          style={{ height: '50px', minWidth: '150px' }}
        >
          {label}
        </Button>
        <input type="file" accept="*" ref={inputFileRef} />
      </Col>
      <Col className="d-flex justify-content-center grow-1 flex-column">
        <div style={{ color: '#666', fontSize: '12Px', lineHeight: '17px' }}>
          {size}
        </div>
        <div style={{ color: '#666', fontSize: '12Px', lineHeight: '17px' }}>
          {ratio}
        </div>
      </Col>
    </Row>
  );
};

export default ImageUpload;
