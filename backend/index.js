// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();
// const connectDB = require('./config/db');
// const router = require("./routes");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());
// app.use("/api", router);

// const messages = [];
// const activeUsers = new Map();

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('userConnected', (userData) => {
//         activeUsers.set(userData.userId, {
//             ...userData,
//             socketId: socket.id
//         });
//         io.emit('userList', Array.from(activeUsers.values()));
        
//         const userMessages = messages.filter(msg => 
//             msg.userId === userData.userId || msg.recipientId === userData.userId
//         );
//         socket.emit('previousMessages', userMessages);
//     });

//     socket.on('joinRoom', (userId) => {
//         socket.join(userId);
//     });

//     socket.on('sendMessage', (message) => {
//         const newMessage = { 
//             ...message, 
//             id: Date.now(),
//             timestamp: new Date(),
//             status: 'sent' 
//         };
//         messages.push(newMessage);
//         io.emit('receiveMessage', newMessage);
//     });

//     socket.on('messageRead', ({ messageId, userId }) => {
//         const message = messages.find(m => m.id === messageId);
//         if (message) {
//             message.status = 'read';
//             io.emit('messageStatus', { messageId, status: 'read' });
//         }
//     });

//     socket.on('disconnect', () => {
//         for (const [userId, user] of activeUsers.entries()) {
//             if (user.socketId === socket.id) {
//                 activeUsers.delete(userId);
//                 break;
//             }
//         }
//         io.emit('userList', Array.from(activeUsers.values()));
//         console.log('User disconnected');
//     });
// });

// const PORT = process.env.PORT || 8080;
// connectDB().then(() => {
//     server.listen(PORT, () => {
//         console.log("Server is running on port", PORT);
//     });
// });

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require("./routes");

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000", "https://webstie-b-n-c-c-s-n-ph-m-i-n-t.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const io = socketIo(server, {
    cors: {
        origin: [process.env.FRONTEND_URL || "http://localhost:3000", "https://webstie-b-n-c-c-s-n-ph-m-i-n-t.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

const messages = [];
const activeUsers = new Map();

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('userConnected', (userData) => {
        activeUsers.set(userData.userId, {
            ...userData,
            socketId: socket.id
        });
        io.emit('userList', Array.from(activeUsers.values()));
        
        const userMessages = messages.filter(msg => 
            msg.userId === userData.userId || msg.recipientId === userData.userId
        );
        socket.emit('previousMessages', userMessages);
    });

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
    });

    socket.on('sendMessage', (message) => {
        const newMessage = { 
            ...message, 
            id: Date.now(),
            timestamp: new Date(),
            status: 'sent' 
        };
        messages.push(newMessage);
        io.emit('receiveMessage', newMessage);
    });

    socket.on('messageRead', ({ messageId, userId }) => {
        const message = messages.find(m => m.id === messageId);
        if (message) {
            message.status = 'read';
            io.emit('messageStatus', { messageId, status: 'read' });
        }
    });

    socket.on('disconnect', () => {
        for (const [userId, user] of activeUsers.entries()) {
            if (user.socketId === socket.id) {
                activeUsers.delete(userId);
                break;
            }
        }
        io.emit('userList', Array.from(activeUsers.values()));
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});


