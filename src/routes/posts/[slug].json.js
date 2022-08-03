import { client } from "$lib/graphql-client";
import { gql } from "graphql-request";

export const GET = async ({ params }) => {
    const slug = params.slug;
    try {
        const query = gql`
        query {
            findSlug(modelName: "post", slug: "${slug}") {
              ... on PostEntityResponse {
                data {
                  attributes {
                    title
                    slug
                    content
                    publishedAt
                    author {
                      data {
                        attributes {
                          username
                        }
                      }
                    }
                    tags(sort: "title") {
                      data {
                        attributes {
                          title
                          slug
                        }
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
            body: JSON.stringify(data.findSlug),
        }
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        }
    }
}