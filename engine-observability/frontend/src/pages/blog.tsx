'use-client';

import React from 'react';
import { Card, CardHeader, Col } from 'reactstrap';

import StandardLayout from '@/layouts/Standard';

function Blog() {
  return (
    <StandardLayout>
      <Col lg="5" md="7" style={{ margin: 'auto' }}>
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Blog Page</small>
            </div>
          </CardHeader>
        </Card>
      </Col>
    </StandardLayout>
  );
}

export default Blog;
