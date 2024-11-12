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
const io = socketIo(server);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const messages = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Gửi tin nhắn cũ cho người dùng mới kết nối
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', (message) => {
        const newMessage = { ...message, id: Date.now(), timestamp: new Date() };
        messages.push(newMessage);
        io.emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Khởi động server
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});

