const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean
} = require('graphql')


const Events = [
  { id: 1, name: 'Independence Day', description: 'Declaration of USA', eventDate: '07/04/2023' },
  { id: 2, name: 'Memorial Day', description: 'National Holiday in USA', eventDate: '05/29/2023' },
]

const EventType = new GraphQLObjectType({
  name: 'Event',
  description: 'This is a event',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    eventDate: { type: new GraphQLNonNull(GraphQLString) },
  })
})


const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    
    events: {
      type: new GraphQLList(EventType),
      description: 'List of All Default Events',
      resolve: () => Events
    },

    event: {
      type: EventType,
      description: 'Single Event',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: (root, args) => {
        return Events.find(event => event.id === args.id)
      }
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({

    addEvent: {
      type: EventType,
      description: 'Add a new Event',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          type: new GraphQLNonNull(GraphQLString)
        },
        eventDate: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: (root, args) => {
        const newEvent = {
          id: Events.length + 1,
          name: args.name,
          description: args.description,
          eventDate: args.eventDate,
        }
        Events.push(newEvent)
        return newEvent
      }
    },

    deleteEvent: {
      type: EventType,
      description: 'Delete a Event',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: (root, args) => {
        const event = Events.find(event => event.id === args.id)
        if (event) {
          Events.splice(Events.indexOf(event), 1)
          return event
        }
        return null
      }
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');