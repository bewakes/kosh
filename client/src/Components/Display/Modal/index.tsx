import React from 'react';

import './style.scss';

interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
    const { onClose } = props;
    return (
        <div id="modal-mask">
            <div id="modal-item">
                <div id="modal-close-icon">
                    <b onClick={onClose}>x</b>
                </div>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
