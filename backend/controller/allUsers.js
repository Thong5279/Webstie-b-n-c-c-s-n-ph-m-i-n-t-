const userModel = require("../models/userModel")
const router = require("../routes")

async function allUsers(req,res){
    try {
        console.log("userid all User",req.userId)

        const allUser = await userModel.find()
        res.json({
            message : "All User ",
            data : allUser,
            success : true,
            console : false

        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false
        })
    }
}

module.exports = allUsers