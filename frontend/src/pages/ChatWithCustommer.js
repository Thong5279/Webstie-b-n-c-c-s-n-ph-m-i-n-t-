import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/vi';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatWithCustomer = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatRooms, setChatRooms] = useState({});
    const messagesEndRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());

    // Fetch users who have sent messages
    useEffect(() => {
        socket.on('previousMessages', (previousMessages) => {
            const roomMessages = {};
            previousMessages.forEach(message => {
                const roomId = message.userId === 'admin' ? message.recipientId : message.userId;
                if (!roomMessages[roomId]) {
                    roomMessages[roomId] = [];
                }
                roomMessages[roomId].push(message);
            });
            setChatRooms(roomMessages);
        });

        socket.on('receiveMessage', (message) => {
            if (message.recipientId === 'admin' || message.userId === 'admin') {
                const roomId = message.userId === 'admin' ? message.recipientId : message.userId;
                setChatRooms(prev => ({
                    ...prev,
                    [roomId]: [...(prev[roomId] || []), message]
                }));
            }
        });

        socket.on('userList', (userList) => {
            setUsers(userList);
        });

        socket.on('userStatus', ({ userId, status }) => {
            setOnlineUsers(prev => {
                const newSet = new Set(prev);
                if (status === 'online') {
                    newSet.add(userId);
                } else {
                    newSet.delete(userId);
                }
                return newSet;
            });
        });

        return () => {
            socket.off('previousMessages');
            socket.off('receiveMessage');
            socket.off('userList');
            socket.off('userStatus');
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        socket.emit('joinRoom', user.userId);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedUser) {
            const message = {
                text: newMessage,
                sender: 'Admin',
                userId: 'admin',
                recipientId: selectedUser.userId,
                timestamp: new Date()
            };
            socket.emit('sendMessage', message);
            setNewMessage('');
        }
    };

    return (
        <div className="container mx-auto p-4 flex h-[calc(100vh-100px)]">
            {/* Danh sách người dùng */}
            <div className="w-1/4 bg-white shadow-md rounded-lg mr-4 overflow-y-auto">
                <h3 className="p-4 border-b font-bold">Danh sách người dùng</h3>
                <div className="divide-y">
                    {users.map((user) => (
                        <div
                            key={user.userId}
                            onClick={() => handleUserSelect(user)}
                            className={`p-4 cursor-pointer hover:bg-gray-50 ${
                                selectedUser?.userId === user.userId ? 'bg-gray-100' : ''
                            }`}
                        >
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <div className="flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                            onlineUsers.has(user.userId) ? 'bg-green-500' : 'bg-gray-400'
                                        }`}></span>
                                        <span className="text-sm text-gray-500">
                                            {onlineUsers.has(user.userId) ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Khung chat */}
            <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden">
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b">
                            <h2 className="font-bold">Chat với {selectedUser.name}</h2>
                        </div>
                        <div className="h-[calc(100vh-280px)] overflow-y-auto p-4">
                            {chatRooms[selectedUser.userId]?.map((msg, index) => (
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
                    </>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        Chọn một người dùng để bắt đầu chat
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWithCustomer;