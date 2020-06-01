import React from 'react';

import {
    Row, Col, Container,
} from 'reactstrap';

interface SingleColumnProps {
    offset: number;
    Component: React.FC;
};

const SingleColumn = (props: SingleColumnProps) => {
    const { Component, offset=1 } = props;
    const clippedOffset = Math.min(5, Math.max(0, offset));
    const contentWidth = 12 - 2 * clippedOffset;
    return (
        <Container fluid>
            <Row>
                { clippedOffset ? (<Col md={clippedOffset} />) : null }
                <Col md={contentWidth}>
                    <Component />
                </Col>
                { clippedOffset ? (<Col md={clippedOffset} />) : null }
            </Row>
        </Container>
    );
};

export default SingleColumn;
