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
    },
    createProduct: async function ({ productInput }) {
        // return productInput;
        const product = new Product({
          name:productInput.name,
          description: productInput.description,
          price: productInput.price,
          discount: productInput.discount,
        });
        const createdProduct= await product.save();
        return {
          ...createdProduct._doc,
          _id: createdProduct._id.toString(),
        };
    },
}