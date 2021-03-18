// # IMPORTS -/

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// # EXPRESS::INITIALIZE APP -/

const app = express();

// # ADD MIDDLEWARE -/

app.use(bodyParser.json());

app.use(cors());

// # GRAPHQL::API SERVICE -/

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);


// # MONGOOSE::DATABASE SETUP -/


mongoose
  .connect(
    `mongodb://admin:password@host1.com:27017/mean-ecommerce?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(3000, console.log('Connected to Port 3000.'));
  })
  .catch((err) => console.log(err));
