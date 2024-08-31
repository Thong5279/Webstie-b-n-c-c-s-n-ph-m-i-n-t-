const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : String,
    sex: {
        type: String,
        enum: ['Nam', 'Nữ', 'Khác'],  // Chỉ cho phép các giá trị này
        default: 'Khác'
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    phone : String,
    address : String,
    password : String,
    profilePic : String,
    role : String,
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel