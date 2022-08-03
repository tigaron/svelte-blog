import { client } from "$lib/graphql-client";
import { gql } from "graphql-request";

export const GET = async () => {
    try {
        const query = gql`
        query {
            posts {
              data {
                attributes {
                  title
                  slug
                  excerpt
                  publishedAt
                  tags(sort: "title") {
                    data {
                      attributes {
                        title
                        slug
                      }
                    }
                  }
                  author {
                    data {
                      attributes {
                        username
                        photo {
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
            }
        }          
        `;
        const data = await client.request(query);
        return {
            status: 200,
            body: JSON.stringify(data.posts),
        }
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        }
    }
}