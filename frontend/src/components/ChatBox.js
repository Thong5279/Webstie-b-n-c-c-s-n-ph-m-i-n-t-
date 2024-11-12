import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const user = useSelector((state) => state.user?.user);

    useEffect(() => {
        if (user) {
            socket.emit('userConnected', {
                userId: user._id,
                name: user.name,
                email: user.email
            });
        }

        socket.on('previousMessages', (previousMessages) => {
            setMessages(previousMessages);
        });

        socket.on('receiveMessage', (message) => {
            if (message.recipientId === (user?._id || 'guest') || 
                message.userId === (user?._id || 'guest')) {
                setMessages(prev => [...prev, message]);
            }
        });

        return () => {
            socket.off('previousMessages');
            socket.off('receiveMessage');
        };
    }, [user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message = {
                text: newMessage,
                sender: user?.name || 'Khách',
                userId: user?._id || 'guest',
                recipientId: 'admin',
                timestamp: new Date()
            };
            socket.emit('sendMessage', message);
            setNewMessage('');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110">
                {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
            </button>
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl">
                    <div className="bg-red-600 text-white p-4 rounded-t-lg">
                        <h3 className="font-bold">Tư vấn trực tuyến</h3>
                        <p className="text-sm">Hãy để chúng tôi giúp bạn</p>
                    </div>
                    <div className="h-96 overflow-y-auto p-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`mb-4 ${msg.userId === (user?._id || 'guest') ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block p-2 rounded-lg ${msg.userId === (user?._id || 'guest') ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="font-bold text-xs">{msg.sender}</p>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
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
                            <button type="submit" className="bg-red-600 text-white rounded p-2">
                                <FaPaperPlane />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBox; 