const uploadProductPermission = require("../helpers/permission")
const productModel = require("../models/productModel")

async function UploadProductController(req,res){
    try {
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Từ chối quyền truy cập")
        }
        
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()
        
        res.status( 201).json({
            message : "Thêm sản phẩm thành công",
            error : false,
            success : true,
            data : saveProduct
        })
    } catch (error) {
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false
        })
    }
}

module.exports = UploadProductController