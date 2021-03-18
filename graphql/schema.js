const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Product{
        _id:ID!
        description: String!
        price: Float!
        discount: Number
    }    
    type ProductData {
        product: [Product!]!
    }
    type RootQuery{
        product: ProductData!
    }
    schema {
        query: RootQuery
    }
`)