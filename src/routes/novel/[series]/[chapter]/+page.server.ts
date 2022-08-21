import { error } from '@sveltejs/kit';
import { gql } from "graphql-request";
import gqlClient from "$lib/configs/gqlClient";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, params }) {
	const { series, chapter } = params;
	const order = url.searchParams.get("order");
	let query;
	if (order == null) {
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
					novel: { slug: { eq: "${series}" } }
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
	const data = await gqlClient.request(query);
	if (!data) throw error(404, 'Not found');
	if (order == null) return data.findSlug;
	else return data.chapters;
}
