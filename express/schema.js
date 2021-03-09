const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { 
    GraphQLSchema,
    GraphQLString,
 } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Hello world',
        fields: () => ({
            type: GraphQLString,
            resolve: () => 'Hello World!',
        })
    })
});

module.exports = schema;