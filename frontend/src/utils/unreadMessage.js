import { useState, useEffect } from 'react';

export const useUnreadMessages = (socket, userId) => {
    const [unreadMessages, setUnreadMessages] = useState({});

    useEffect(() => {
        // Lắng nghe tin nhắn mới
        socket.on('receiveMessage', (message) => {
            if (message.recipientId === userId) {
                setUnreadMessages(prev => ({
                    ...prev,
                    [message.userId]: (prev[message.userId] || 0) + 1
                }));
            }
        });

        // Đánh dấu đã đọc khi chọn user để chat
        const markAsRead = (selectedUserId) => {
            setUnreadMessages(prev => ({
                ...prev,
                [selectedUserId]: 0
            }));
        };

        return () => {
            socket.off('receiveMessage');
        };
    }, [socket, userId]);

    return [unreadMessages, setUnreadMessages];
}; 