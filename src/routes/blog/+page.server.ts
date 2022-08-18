import { error } from '@sveltejs/kit';
import { gql } from "graphql-request";
import gqlClient from "$lib/configs/gqlClient";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
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
	const { posts } = await gqlClient.request(query);

	if (posts) {
		return posts;
	}

	throw error(404, 'Not found');
}
