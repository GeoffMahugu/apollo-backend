## MEAN STACK - Aplollo GraphQL Setup

This documentation will contain the setup guide to setup a simple NodeJS backend with a graphql service.
We will be using the MEAN stack, backend being MongoDB and using Mongoose to do the ORM opperations.


### Prerequisites

These are some of the technologies used:

 - (Apollo GraphQL)[https://www.apollographql.com/docs/]
 - (Express.js)[https://expressjs.com/en/starter/hello-world.html]
 - (Docker)[https://docs.docker.com/get-started/]
 - (DockerCompose)[https://docs.docker.com/compose/]


### Initialize the project

Run ``npm init`` to initialize the project.

### Express.js Setup 

Install (express.js)[https://expressjs.com/en/starter/hello-world.html] as a dependancy module.

``npm install express --save``

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

Lets now run the express app. On the terminal run ``node app.js``

Proceed to ``https://localhost:3000`` to see the response on your browser.


#### Install nodemon

This will help us serve the express application and do hot reloads.

We will install it as a dev-dependancy:

``npm install --save-dev nodemon``


and on the paclahe.json file, scripts section we add this command:

```
"scripts": {
    "serve": "nodemon ./app.js localhost 8080"
},
```
to run the serve, run this command on your terminal:

``npm run serve``

and access the serve at this uri ``https://localhost:3000`


### MongoDB setup

We will use a docker image to quickly setup an instance of a mongoDb with a persistent storage on your local disk.

We use docker-compose to spin up the docker images.

#### Create docker-compose.yml 

We will first create a ``docker.compose.yml`` file in the root of the project.

Paste this in the file as it contains configurations for the database images:


```

version: "3.3" # specify docker-compose version

# Define the services/containers to be run
services:
  database: # name of service: database
    image: mongo:latest # specify image to build container from
    container_name: mean_mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
      - MONGO_DB_USERNAME=admin1
      - MONGO_DB_PASSWORD=password
      - MONGO_DB=mean-ecommerce
    volumes:
      - ./mongo:/home/mongodb
      - ./mongo/init-db.d/:/docker-entrypoint-initdb.d/
      - ./mongo/db:/data/db
    ports:
      - "27017:27017" # specify port forewarding

```

#### Run Docker Images

To spin up the containerized environment, run:

``docker-compose -f "./docker-compose.yml" up -d --build``
