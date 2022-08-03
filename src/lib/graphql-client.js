import { GraphQLClient } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "$lib/variables.js";

export const client = new GraphQLClient(GRAPHQL_ENDPOINT);