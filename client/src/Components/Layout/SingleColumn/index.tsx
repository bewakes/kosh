import React from 'react';

import {
    Row, Col, Container,
} from 'reactstrap';

interface SingleColumnProps {
    offset: number;
    Component: React.FC;
    componentProps: any;
};

const SingleColumn = (props: SingleColumnProps) => {
    const { Component, offset=1, componentProps } = props;
    const clippedOffset = Math.min(5, Math.max(0, offset));
    const contentWidth = 12 - 2 * clippedOffset;
    return (
        <Container fluid>
            <Row>
                { clippedOffset ? (<Col md={clippedOffset} />) : null }
                <Col md={contentWidth}>
                    <Component {...componentProps}/>
                </Col>
                { clippedOffset ? (<Col md={clippedOffset} />) : null }
            </Row>
        </Container>
    );
};

export default SingleColumn;
