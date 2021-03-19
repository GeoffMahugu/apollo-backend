const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Product{
        _id:ID!
        name: String!
        description: String!
        price: Float!
        discount: Int
        created_at: Date
        updated_at: Date
    }    
    type ProductData {
        products: [Product!]!
    }
    input ProductInputData {
        name: String!
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