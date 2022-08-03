// Endpoint to get a specific novel's chapter
import { client } from "$lib/graphql-client";
import { gql } from "graphql-request";

export const GET = async ({ params }) => {
    const [novel, chapter, order] = params.chapter.split("/");
    try {
        let query;
        if (order === undefined) {
            query = gql`
            query {
                findSlug(modelName: "chapter", slug: "${chapter}") {
                  ... on ChapterEntityResponse {
                    data {
                      attributes {
                        title
                        slug
                        order
                        source
                        content
                        publishedAt
                        readingTime
                        novel {
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
        } else {
            query = gql`
            query {
                chapters(
                  filters: {
                    novel: { slug: { eq: "${novel}" } }
                    and: { order: { in: [${parseInt(order)-1}, ${parseInt(order)+1}] } }
                  }
                ) {
                  data {
                    attributes {
                      slug
                      order
                    }
                  }
                  meta {
                    pagination {
                      total
                    }
                  }
                }
            }
            `;
        }
        const data = await client.request(query);
        if (order === undefined) {
            return {
                status: 200,
                body: JSON.stringify(data.findSlug),
            }
        } else {
            return {
                status: 200,
                body: JSON.stringify(data.chapters),
            }
        }
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        }
    }
}