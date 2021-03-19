const Product = require('../models/product');


module.exports = {
    /**
     * 
     * @returns Product 
     * { name, description, price, discount, created_at, updated_at}
     * @query
     * 
        {
            products{products{_id, description, price, discount}}
        }
     */
    products: async function() {
        const products = await Product.find();
        return {
            products: products.map((q)=>{
                return {
                    ...q._doc,
                    _id: q._id.toString(),
                };
            })
        };
    },

    /**
     * 
     * @param { name, description, price, discount} ProductInput
     * @returns Product
     * 
     * @mutation 
     * mutation {
        createProduct(productInput: { name: "Test Product 1",description: "Test Product",price: 7000.50,discount: 10}){
            _id,
            name,
            description,
            price,
            discount,
            created_at,
            updated_at
        }
       }
     */
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

    /**
     * 
     * @param {id}, { name, description, price, discount} ID,ProductInput
     * @returns Product
     * 
     * @mutation 
     * mutation {
        updateProduct(id:"605497bce3ad5c614f21c292",productInput: { name: "Test Product 2",description: "Test Product",price: 7500.50,discount: 8}){
            _id,
            name,
            description,
            price,
            discount,
            created_at,
            updated_at
        }
        }
     */
    updateProduct: async function ({ id, productInput }) {
        const product = await Product.findById(id);
        if (!product) {
          throw new Error('Product Not found!');
        }
        product.name = productInput.name;
        product.description = productInput.description;
        product.price = productInput.price;
        product.discount = productInput.discount;

        const updatedProduct = await product.save();
        return {
          ...updatedProduct._doc,
          _id: updatedProduct._id.toString(),
        };
      },
};
