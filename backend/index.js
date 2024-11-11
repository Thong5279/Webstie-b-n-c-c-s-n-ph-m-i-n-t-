const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require("./routes")

const app = express()

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        'https://webstie-b-n-c-c-s-n-ph-m-i-n-t-ep8t.vercel.app'
    ],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api", router)

const PORT = 8080 || process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB")
        console.log("Server is running")
    })
})

