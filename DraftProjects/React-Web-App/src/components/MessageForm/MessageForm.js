import React from 'react';
import PropTypes from 'prop-types';
import './MessageForm.scss';

const MessageForm = props => {
    const {chats} = props;
    const onSubmitMessage = (event) => {
        event.preventDefault();
        console.log('onSubmitMessage()')
    }
    return (
        <div className="selected-chat">
            {chats.map(chat => (
                <div className="message-row" key={chat.id}>
                    <small className="message-box" key={chat.id}>{chat.message}</small></div>
            ))}
            <div className="message-form">
                <form onSubmit={onSubmitMessage}>
                    <input className="message-form__input form-control" placeholder="Type message here..."/>
                    <button className="message-form__btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                            <g stroke="#a1a1aa" strokeWidth="2" strokeLinejoin="round">
                                <path d="M21.137 11.733L3 20.466l3.359-8.733L3 3l18.137 8.733z" fill="#fff"/>
                                <path d="M21.137 11.733H6.359" strokeLinecap="round"/>
                            </g>
                            <defs/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

MessageForm.propTypes = {
    chats: PropTypes.array
}

export default MessageForm;
