import { error } from '@sveltejs/kit';
import { gql } from "graphql-request";
import gqlClient from "$lib/configs/gqlClient";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
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
	const { novels } = await gqlClient.request(query);

	if (novels) {
		return novels;
	}

	throw error(404, 'Not found');
}
