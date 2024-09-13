const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
        productName : String, //ten sp 
        brandName : String,     //ten hang
        category : String,     //so luong
        quantity : Number,  
        productImage : [],
        description : String,
        price : Number,
        sellingPrice : Number
},{
    timesetamps : true  
}
)
 
const productModel = mongoose.model("product",productSchema)

module.exports = productModel