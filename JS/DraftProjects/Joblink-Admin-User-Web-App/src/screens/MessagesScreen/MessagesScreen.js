import React, {useState} from 'react';
import MessageForm from "../../components/MessageForm";
import ErrorBoundary from "../../components/ErrorBoundary";
import chats from "./chats";

const MessagesScreen = props => {
    const {title} = props;
    const [chatSelected, setChatSelected] = useState(true);

    const notChatSelectedBox = (
        <div className="no-select-chat">
            <span className="no-select-chat-text">No chat selected.Please choose one on the left</span>
        </div>
    );

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h1 className="title">{title}</h1>
                        </div>
                        <div className="col-12 col-md-6 mb-5">
                            <div className="d-flex justify-content-center justify-content-md-end align-items-center">
                                <button className="btn btn--light-green" disabled>Create new</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 col-xl-4 pr-0">
                            <div className="card chat-sidebar pb-smd-3">
                                <ul className="orders-list messages-list">
                                    {chats?.map(chat => (
                                        <li onClick={() => setChatSelected(false)}
                                            className={`${chat.unread && 'unread'}`} key={chat.id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="message-row">
                                                    {chat.unread && <span className="unread-icon"/>}
                                                    <span className="message-title">{chat.chatName}</span>
                                                </div>
                                                <span className="message-date">{chat.date} hour ago</span>
                                            </div>
                                            <div className="message-desc">
                                                <b className="message-sender-name">{chat.senderName}:</b>
                                                {chat.message}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7 col-xl-8">
                            <div className="chat-box mt-5 mt-lg-0">
                                {chatSelected ? notChatSelectedBox : <MessageForm chats={chats}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default MessagesScreen;
