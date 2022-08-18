import { GraphQLClient } from "graphql-request";
import { strapi } from "$lib/utils/variables";

const gqlClient = new GraphQLClient(strapi.graphql);

export default gqlClient;
