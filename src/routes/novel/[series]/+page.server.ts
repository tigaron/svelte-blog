import { error } from '@sveltejs/kit';
import { gql } from "graphql-request";
import gqlClient from "$lib/configs/gqlClient";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: { series: string } }) {
	const { series } = params;
	const query = gql`
	query {
		findSlug(modelName: "novel", slug: "${series}") {
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
	const { findSlug: novel } = await gqlClient.request(query);

	if (novel) {
		return novel;
	}

	throw error(404, 'Not found');
}
