## MEAN STACK - Aplollo GraphQL Setup

This documentation will contain the setup guide to setup a simple NodeJS backend with a graphql service.
We will be using the MEAN stack, backend being MongoDB and using Mongoose to do the ORM opperations.


# Initialize the project

Run ``npm init`` to initialize the project.

# Express.js Setup 

Install express to the nodemodules.

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


