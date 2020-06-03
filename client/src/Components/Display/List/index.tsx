import React from 'react';

import { ListGroupItem, ListGroup } from 'reactstrap';

import './style.scss';

interface ListProps {
    items: any[];
    Component: React.FC<{item: any}>;
}

const List = (props: ListProps) => {
    const { items, Component } = props;
    return (
        <ListGroup>
        {
            items.map((item: any, i: number) => (
                <ListGroupItem key={i} className="list-item">
                    <Component item={item} />
                </ListGroupItem>
            ))
        }
        </ListGroup>
    );
};

export default List;
