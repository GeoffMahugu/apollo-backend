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
    type RootQuery{
        products: ProductData!
    }
    schema {
        query: RootQuery
    }
`)