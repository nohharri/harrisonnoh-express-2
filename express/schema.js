const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
 } = require('graphql');
const trips = require('./data/trips');

 /**
  * Type that represents the latest type.
  */
 const LatestTripType = new GraphQLObjectType({
     name: 'Trip',
     description: 'The latest trip to display',
     fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        location: { type: GraphQLNonNull(GraphQLString) },
        dateStart: { type: GraphQLNonNull(GraphQLString) },
        dateEnd: { type: GraphQLNonNull(GraphQLString) },
     })
 })

 const RootQueryType = new GraphQLObjectType({
     name: 'Query',
     description: 'Root Query',
     fields: () => ({
         latestTrip: {
             type: new GraphQLNonNull(LatestTripType),
             description: 'The latest trip to display.',
             resolve: () => { 
                // Logic currently gets the latest one.
                // This should use a db query in the future.
                return trips[trips.length - 1];
             }, 
         }
     })
 })

const schema = new GraphQLSchema({
    query: RootQueryType
});

module.exports = schema;