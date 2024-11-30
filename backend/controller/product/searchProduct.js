const productModel = require("../../models/productModel")

const searchProduct = async(req,res) => {
    try{
        const query = req.query.q
        
       const regex = new RegExp(query,'i','g')
       
        const product = await productModel.find({
            "$and": [
                {
                    "$or": [
                        {
                            productName: regex
                        },
                        {
                            category: regex
                        }
                    ]
                },
                {
                    quantity: { $gte: 1 }
                }
            ]
        })

        res.json({
            data: product,
            message: 'Danh sách tìm kiếm',
            error: false,
            success: true
        })

    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = searchProduct