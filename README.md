## MEAN STACK - Aplollo GraphQL

This documentation will contain the setup guide to set up a simple NodeJS backend with a graphql service.
We will be using the MEAN stack, backend being MongoDB and using Mongoose to do the ORM operations.

The full writeup for the project can be found in this blog: [How to build a GraphQL API backend with Express and MongoDB](https://javascript.plainenglish.io/graphql-express-mongo-backend-d41625f728bf)

<img width="1920" alt="GraphQL Express Mongo (7)" src="https://user-images.githubusercontent.com/17265995/119226372-6d72a480-bb11-11eb-94ad-ac5cb2cd4aeb.png">

### Screenshot

![Screenshot from 2021-03-19 16-32-39](https://user-images.githubusercontent.com/17265995/111789082-d51e3080-88d1-11eb-85e9-9ecc3708a31f.jpg)


### Prerequisites

These are some of the technologies used:

 - [Apollo GraphQL](https://www.apollographql.com/docs/)
 - [Express.js](https://expressjs.com/en/starter/hello-world.html)
 - [Docker](https://docs.docker.com/get-started/)
 - [DockerCompose](https://docs.docker.com/compose/)


### Initialize the project

Run ``npm init`` to initialize the project.

### Express.js Setup 

Install [Express.js](https://expressjs.com/en/starter/hello-world.html) as a dependency module.

``npm install express --save``

install other dependencies:

``npm install cors body-parser --save``

Then create your entry app. In my case will be using ``app.js``

Paste the Hello World starter code in the ``app.js`` file:

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

```

Let's now run the express app. On the terminal run ``node app.js``

Proceed to https://localhost:3000 to see the response on your browser.


#### Install nodemon

This will help us serve the express application and do hot reloads.

We will install it as a dev-dependency:

``npm install --save-dev nodemon``


and on the (package.json)[package.json] file, scripts section we add this command:

```
"scripts": {
    "serve": "nodemon ./app.js localhost 8080"
},
```
to run the serve, run this command on your terminal:

``npm run serve``

and access the serve at this uri https://localhost:3000


### MongoDB setup

We will use a docker image to quickly set up an instance of a MongoDB with persistent storage on your local disk.

We use docker-compose to spin up the docker images.


#### Create docker-compose.yml 


We will first have to create the configurations for MongoDB. For this, we will create a folder called mongo.docker and create the ``mongo_init.js`` configuration file.

For the file contents:

```

db.createUser(
    {
        user: "backend_admin",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "ecommerce"
            }
        ]
    }
);

```

We will then create a ``docker.compose.yml`` file at the root of the project.

Paste this in the file as it contains configurations for the database images:


```

version: "3.3" # specify docker-compose version

# Define the services/containers to be run
services:
  database: # name of service: database
    image: mongo:latest # specify image to build container from
    container_name: mean_mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: backend_admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: ecommerce
    volumes:
      - ./mongo:/home/mongodb
      - ./docker/:/docker-entrypoint-initdb.d/
      - ./mongo/db:/data/db
    ports:
      - "27017:27017" # specify port forewarding

```

This will create a MongoDatabase container named ``mean_mongo``

This will also create a database named ``ecommerce`` database username will be ``backend_admin`` with a password ``password``

#### Run Docker Images

To spin up the containerized environment, run:

``docker-compose -f "./docker-compose.yml" up -d --build``


**IMPORTANT:** 

To read on how to setup your docker environment read [README_MONGO_DOCKER.md](README_MONGO_DOCKER.md) file

#### Visualize MongoDB

you can use any GUI visualizer for MongoDB, In my case will use [Studio3T](https://studio3t.com/download/)

![Screenshot from 2021-03-19 17-42-24](https://user-images.githubusercontent.com/17265995/111798209-e881c980-88da-11eb-881a-20c3faf13ad4.jpg)


### Install Mongoose

Mongoose will enable us to create database Schemas and interact with the database easily (ORM)

``npm install mongoose --save``


### Install express-graphql

This will enable us to create the [GraphQL](https://graphql.org/graphql-js/running-an-express-graphql-server/) API Server. To install the module run:

``npm install express-graphql graphql --save``

### Create GraphQL API Service

For this, we will need to update the ``app.js`` for GraphQL API Service.

```

# IMPORTS -/

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const config = require('./config/config.json');

# EXPRESS::INITIALIZE APP -/

const app = express();

# ADD MIDDLEWARE -/

app.use(bodyParser.json());

app.use(cors());

# GRAPHQL::API SERVICE -/

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);


# MONGOOSE::DATABASE SETUP -/


mongoose
  .connect(
    'mongodb://backend_admin:password@localhost:27017/ecommerce',
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


```

#### GraphQL Schema

This file [schema.js](graphql/schema.js) contains the business logic and CRUD functionality.
#### GraphQL Resolvers

This file [resolvers.js](graphql/resolvers.js) contains the business logic and CRUD functionality.


### CRUD 

Once the project is setup we can proceed to perform CRUD on our product schema.

To access the [graphql interface](http://localhost:3000/graphql) go to http://localhost:3000/graphql


#### CREAT Product Mutation:

To create a new product, run this mutation on the graphQl console.

```

mutation {
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

```

response should be:

```
{
  "data": {
    "createProduct": {
      "_id": "6054a67820f5c5716e99b657",
      "name": "Test Product 1",
      "description": "Test Product",
      "price": 7000.5,
      "discount": 10,
      "created_at": "1616160376613",
      "updated_at": "1616159865675"
    }
  }
}

```


#### READ: Query Product:

To read all product, run this query on the graphQl console.


```
{
  products{products{_id, description, price, discount,created_at,updated_at}}
}

```

response should be (close to this):

```
{
  "data": {
    "products": {
      "products": [
        {
          "_id": "605496c1e3ad5c614f21c291",
          "description": "Test Product",
          "price": 7000.5,
          "discount": 10,
          "created_at": "1616156353503",
          "updated_at": "1616156297912"
        },
        {
          "_id": "6054a67820f5c5716e99b657",
          "description": "Test Product1",
          "price": 7030.5,
          "discount": 10,
          "created_at": "1616160376613",
          "updated_at": "1616159865675"
        }
      ]
    }
  }
}

```



#### UPDATE Product Mutation:

To update a product, run this mutation on the graphQl console.


```
mutation {
  updateProduct(id:"6054a67820f5c5716e99b657",productInput: { name: "Test Product 2",description: "Test Product",price: 7500.50,discount: 8}){
      _id,
      name,
      description,
      price,
      discount,
      created_at,
      updated_at
  }
}

```

response should be (close to this):

```
{
  "data": {
    "updateProduct": {
      "_id": "6054a67820f5c5716e99b657",
      "name": "Test Product 2",
      "description": "Test Product",
      "price": 7500.5,
      "discount": 8,
      "created_at": "1616160376613",
      "updated_at": "1616159865675"
    }
  }
}

```

#### DELETE Product Mutation:

To delete a product, run this mutation on the graphQl console.


```

mutation {
  deleteProduct(id:"6054a67820f5c5716e99b657"){
      _id,
      name,
      description,
      price,
      discount,
      created_at,
      updated_at
  }
}


```

response should be (close to this):

```
{
  "data": {
    "deleteProduct": {
      "_id": "6054a67820f5c5716e99b657",
      "name": "Test Product 2",
      "description": "Test Product",
      "price": 7500.5,
      "discount": 8,
      "created_at": "1616160376613",
      "updated_at": "1616159865675"
    }
  }
}

```



**Conclusion**

Feel free to use the project as a boilerplate to get you up and running quickly. 

Any Pull Requests to improve the project and help **MEAN STACK / GRAPHQL** developers will be much appreciated ????

With ?????? from the creator.
