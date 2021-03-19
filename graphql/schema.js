const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Product{
        _id:ID!
        description: String!
        price: Float!
        discount: Int
    }    
    type ProductData {
        products: [Product!]!
    }
    input ProductInputData {
        description: String!
        price: Float!
        discount: Int
    }
    type RootQuery {
        products: ProductData!
    }
    type RootMutation {
        createProduct(productInput:ProductInputData): Product!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)