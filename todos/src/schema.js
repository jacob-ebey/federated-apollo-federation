import { gql } from "apollo-server";
import fetch from "cross-fetch";

const schema = {
  typeDefs: gql`
    extend type Query {
      pingTodos: String
    }

    extend type User @key(fields: "id") {
      id: ID! @external
      todos: [Todo!]
    }

    type Todo {
      id: ID!
      user: User!
      createdAt: String!
      label: String!
    }
  `,
  resolvers: {
    Query: {
      pingTodos: () => "pong",
    },
    Todo: {
      user: ({ userId }) => ({ __typename: "User", id: userId }),
    },
    User: {
      todos: async ({ id }) => {
        const res = await fetch(
          `https://5ea385cc270de6001645f7a2.mockapi.io/User/${id}/Todo`
        );
        const json = await res.json();
        return json;
      },
    },
  },
};

export default schema;
