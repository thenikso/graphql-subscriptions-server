import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = [`
  type Comment {
    id: Int!
    content: String!
    filter: String
  }

  type Query {
    getComment(id: Int!): Comment
  }

  type Subscription {
    commentAdded(someFilter: String!): Comment
  }

  schema {
    query: Query
    subscription: Subscription
  }
`];

const resolvers = {
  Query: {
    getComment(id) {
      return {
        id,
        content: 'base comment',
        filter: null,
      };
    },
  },
  Subscription: {
    commentAdded(source, args, context, info) {
      return Object.assign({ filter: args.someFilter }, source);
    },
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
