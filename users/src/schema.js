import { gql } from "apollo-server";
import fetch from "cross-fetch";

const schema = {
  typeDefs: gql`
    extend type Query {
      pingUsers: String
      users: [User!]
    }

    type User @key(fields: "id") {
      id: ID!
      createdAt: String!
      name: String!
      avatar: String
    }
  `,
  resolvers: {
    Query: {
      pingUsers: () => "pong",
      users: async () => {
        const res = await fetch(
          "https://5ea385cc270de6001645f7a2.mockapi.io/User"
        );
        const json = await res.json();
        return json.slice(0, 2);
      },
    },
    User: {
      async __resolveReference({ id }) {
        const res = await fetch(
          `https://5ea385cc270de6001645f7a2.mockapi.io/User/${id}`
        );
        const json = await res.json();
        return json;
      },
    },
  },
};

export default schema;
