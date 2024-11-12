import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/vi';
import { FaUserTie, FaUser, FaCheckDouble } from 'react-icons/fa';
import { useUnreadMessages } from '../utils/unreadMessage';
import '../styles/chat.css';


const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatWithCustomer = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatRooms, setChatRooms] = useState({});
    const messagesEndRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const [unreadMessages, setUnreadMessages] = useUnreadMessages(socket, 'admin');

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
        setUnreadMessages(prev => ({
            ...prev,
            [user.userId]: 0
        }));
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
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                                selectedUser?.userId === user.userId ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <FaUser className="text-gray-500" />
                                    </div>
                                    {user.online && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {chatRooms[user.userId]?.[chatRooms[user.userId].length - 1]?.text || 'Chưa có tin nhắn'}
                                    </p>
                                </div>
                                {unreadMessages[user.userId] > 0 && (
                                    <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {unreadMessages[user.userId]}
                                    </div>
                                )}
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
                                <div key={index} className="mb-4 flex flex-col">
                                    <div className={`flex ${msg.userId === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                                            msg.userId === 'admin' 
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                                            : 'bg-gray-100'
                                        }`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                                    {msg.userId === 'admin' ? <FaUserTie /> : <FaUser />}
                                                </div>
                                                <span className="font-medium text-sm">{msg.sender}</span>
                                            </div>
                                            <p className="text-sm">{msg.text}</p>
                                            <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
                                                <span>{moment(msg.timestamp).format('HH:mm')}</span>
                                                {msg.status === 'read' && <FaCheckDouble />}
                                            </div>
                                        </div>
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