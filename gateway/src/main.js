import { buildFederatedSchema } from "@apollo/federation";
import {
  ApolloGateway,
  LocalGraphQLDataSource,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { ApolloServer } from "apollo-server";

import todosSchame from "todos/schema";
import usersSchema from "users/schema";

const localServices = {
  todos: { schema: todosSchame },
  users: { schema: usersSchema },
};

const services = {
  ...localServices,
};

const DUMMY_SERVICE_URL = "https://";

const gateway = new ApolloGateway({
  serviceList: Object.keys(services).map((name) => ({
    name,
    url: services[name].url || DUMMY_SERVICE_URL,
  })),
  buildService({ name, url }) {
    if (url === DUMMY_SERVICE_URL) {
      return new LocalGraphQLDataSource(
        buildFederatedSchema(services[name].schema)
      );
    } else {
      return new RemoteGraphQLDataSource({
        url,
      });
    }
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server
  .listen({ port: 5000 })
  .then(({ port }) => console.log(`Server started on port ${port}...`));
