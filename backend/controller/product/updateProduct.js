const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")



async function updateProductController(req,res){
    try {
        if(!uploadProductPermission(req.userId)){
            throw new Error("Từ chối quyền truy cập")
        }
        const {_id, ...resBody} = req.body


        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message : "Cập nhật sản phẩm thành công",
            data : updateProduct,
            success : true,
            error : false
           
        })
    
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false
        })
    }
}


module.exports = updateProductController