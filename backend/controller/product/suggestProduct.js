const productModel = require("../../models/productModel");

const suggestProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const regex = new RegExp(query, 'i'); // Tạo regex để tìm kiếm không phân biệt chữ hoa chữ thường

        const suggestions = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        }).limit(5); // Giới hạn số lượng gợi ý

        res.json({
            data: suggestions,
            message: 'Gợi ý tìm kiếm',
            error: false,
            success: true
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = suggestProduct;
