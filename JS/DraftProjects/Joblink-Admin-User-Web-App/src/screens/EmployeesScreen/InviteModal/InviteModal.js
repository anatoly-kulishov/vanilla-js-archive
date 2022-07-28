import React from 'react';
import Modal from "react-modal";
import InviteForm from "./InviteForm";

const InviteModal = props => {
    const {data, modalIsOpen, closeModal, maxWidth = 680} = props;

    const customStyles = {
        content: {
            maxWidth: maxWidth
        },
    };

    const submitInvite = (values) => {
        console.log(values)
    }

    return (
        <Modal isOpen={modalIsOpen}
               onAfterOpen={() => null}
               onRequestClose={() => null}
               style={customStyles}
               ariaHideApp={false}
               contentLabel={`Invite new Employee`}>
            <span className="icon-close" onClick={closeModal}/>
            <div className="modal-head">
                <div className="modal-title">Invite new Employee</div>
            </div>
            <div className="modal-body">
                <InviteForm
                    data={data}
                    closeModal={closeModal}
                    onSubmit={submitInvite}/>
            </div>
        </Modal>
    );
}

export default InviteModal;
