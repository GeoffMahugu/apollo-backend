const Product = require('../models/product');


module.exports = {
    products: async function() {
        const products = await Product.find();
        return {
            products: products.map((q)=>{
                return {
                    ...q._doc,
                    _id: q._id.toString(),
                }
            })
        }
    } 
}