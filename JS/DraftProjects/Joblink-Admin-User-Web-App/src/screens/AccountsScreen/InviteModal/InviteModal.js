import React from 'react';
import Modal from "react-modal";
import InviteForm from "./InviteForm";

const InviteModal = props => {
    const {role, data, modalIsOpen, closeModal, maxWidth} = props;

    const customStyles = {
        content: {
            maxWidth: maxWidth
        },
    };

    const submitInvite = (role) => {
        if (role === 'admin') {
            console.log(role)
        } else if (role === 'user') {
            console.log(role)
        } else {
            console.error('Something went wrong')
        }
    }

    return (
        <Modal isOpen={modalIsOpen}
               onAfterOpen={() => null}
               onRequestClose={() => null}
               style={customStyles}
               ariaHideApp={false}
               contentLabel={`Invite new Joblink ${role}`}>
            <span className="icon-close" onClick={closeModal}/>
            <div className="modal-head">
                <div className="modal-title">{`Invite new Joblink ${role}`}</div>
            </div>
            <div className="modal-body">
                <InviteForm role={role} data={data} closeModal={closeModal} onSubmit={() => submitInvite(role)}/>
            </div>
        </Modal>
    );
}

export default InviteModal;
