// Endpoint to get a specific novel
import { client } from "$lib/graphql-client";
import { gql } from "graphql-request";

export const GET = async ({ params }) => {
    const slug = params.slug;
    try {
        const query = gql`
        query {
            findSlug(modelName: "novel", slug: "${slug}") {
              ... on NovelEntityResponse {
                data {
                  attributes {
                    title
                    slug
                    content
                    chapters(sort: "publishedAt:desc") {
                      data {
                        attributes {
                          title
                          slug
                          readingTime
                          publishedAt
                        }
                      }
                    }
                    cover {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                    attachment {
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