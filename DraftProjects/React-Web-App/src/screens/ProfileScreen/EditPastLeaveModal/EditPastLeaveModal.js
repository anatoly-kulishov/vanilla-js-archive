import React from 'react';
import Modal from "react-modal";
import EditPastLeaveForm from "./EditPastLeaveForm";

const EditPastLeaveModal = props => {
    const {data, modalIsOpen, closeModal, maxWidth = '100%'} = props;

    const customStyles = {
        content: {
            maxWidth: maxWidth,
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
                <EditPastLeaveForm
                    data={data}
                    closeModal={closeModal}
                    onSubmit={submitInvite}/>
            </div>
        </Modal>
    );
}

export default EditPastLeaveModal;
