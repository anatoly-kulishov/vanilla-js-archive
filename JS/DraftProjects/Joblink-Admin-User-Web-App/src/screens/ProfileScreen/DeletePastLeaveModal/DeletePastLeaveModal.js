import React from 'react';
import Modal from "react-modal";

const DeletePastLeaveModal = props => {
    const {modalIsOpen, closeModal, maxWidth = '100%'} = props;

    const customStyles = {
        content: {
            maxWidth: maxWidth,
        },
    };

    const onDeletePastLeaveHandler = () => {
        console.log('onDeletePastLeaveHandler()');
        closeModal();
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
                <div className="modal-title">Are You sure?</div>
            </div>
            <div className="modal-body">
                <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lectus sollicitudin sit pharetra, morbi
                    magna ultricies. Varius aliquet est, laoreet tortor. Sed scelerisque elit morbi placerat leo
                    ultrices arcu. </p>
                <div className="mt-4">
                    <button className="btn btn--danger btn--block mb-2" onClick={onDeletePastLeaveHandler}>Yes, delete this past leave</button>
                    <button className="btn btn--default btn--block" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export default DeletePastLeaveModal;
