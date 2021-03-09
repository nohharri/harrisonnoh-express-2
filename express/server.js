/**
 * Main entry point for the app. This should only be used
 * for routing.
 */

'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
//const schema = require('./schema');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    'hello': 'not!'
  });
});

// test
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

router.get('/test', (req, res) => res.json({ 'poop': 'change' }));

router.get('/graphql', graphqlHTTP({ 
  schema: schema,
  graphiql: true,
}));

router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
