const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
 } = require('graphql');
const trips = require('./data/trips');
const itinerary = require('./data/itinerary');

 /**
  * Type that represents the latest trip.
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

 const ItineraryType = new GraphQLObjectType({
     name: 'Itinerary',
     description: 'The itinerary items for a trip.',
     fields: () => ({
         id: { type: GraphQLNonNull(GraphQLInt) },
         tripId: { type: GraphQLNonNull(GraphQLInt) },
         order: { type: GraphQLNonNull(GraphQLInt) },
         description: { type: GraphQLNonNull(GraphQLString) },
         map: { type: GraphQLString },
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
        },
        itinerary: {
            type: new GraphQLList(ItineraryType),
            description: 'The itinerary items for a single trip.',
            resolve: () => {
                return itinerary;
            }
        }
     })
 })

const schema = new GraphQLSchema({
    query: RootQueryType
});

module.exports = schema;