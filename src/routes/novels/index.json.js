// Endpoint to get all novel collections
import { client } from "$lib/graphql-client";
import { gql } from "graphql-request";

export const GET = async () => {
    try {
        const query = gql`
        query {
          novels(sort: "title") {
            data {
              attributes {
                title
                slug
                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
        `;
        const data = await client.request(query);
        return {
            status: 200,
            body: JSON.stringify(data.novels),
        }
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        }
    }
}