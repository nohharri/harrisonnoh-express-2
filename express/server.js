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
const schema = require('./schema');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    'hello': 'not!'
  });
});

// test
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

router.get('/test', (req, res) => res.json({ 'poop': 'change' }));

router.post('/', (req, res) => res.json({ postBody: req.body }));

// router.post('/graph', (req, res) => graphqlHTTP({ graphiql: true, schema: schema }));

router.get('/poop', (req, res) => ( res.json({ 'test': 'test2' })));


app.use(bodyParser.json());

app.use('/.netlify/functions/server', router);  // path must route to lambda

/** GraphQL. I want to use a path here but I dont know how to make it work. */
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
}));

//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


module.exports = app;
module.exports.handler = serverless(app);
