const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require("./routes")

const app = express()// Tạo ứng dụng Express
app.use(cors())

app.use(express.json())// Cấu hình middleware để phân tích các yêu cầu có định dạng JSON

app.use("/api",router)// Sử dụng router cho tất cả các yêu cầu có tiền tố "/api"

const PORT = 8080 || process.env.PORT// Xác định cổng để chạy server (sử dụng giá trị từ biến môi trường nếu có)

// Kết nối đến cơ sở dữ liệu và sau đó khởi động server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running ")
    })
})

