import { error } from '@sveltejs/kit';
import { gql } from "graphql-request";
import gqlClient from "$lib/configs/gqlClient";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: { slug: string } }) {
	const slug = params.slug;
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
	const { findSlug: post } = await gqlClient.request(query);

	if (post) {
		return post;
	}

	throw error(404, 'Not found');
}
