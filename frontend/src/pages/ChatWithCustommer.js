import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/vi';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatWithCustomer = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message = { text: newMessage, sender: 'Admin', userId: 'admin' };
            setMessages((prevMessages) => [...prevMessages, message]);
            socket.emit('sendMessage', message);
            setNewMessage('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Chat với khách hàng</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="h-[calc(100vh-250px)] overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 ${msg.userId === 'admin' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block p-2 rounded-lg ${msg.userId === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                <p className="font-bold text-xs">{msg.sender}</p>
                                <p>{msg.text}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {moment(msg.timestamp).format('LT')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder="Nhập tin nhắn..."
                        />
                        <button type="submit" className="bg-blue-600 text-white rounded p-2 px-4">
                            Gửi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatWithCustomer;