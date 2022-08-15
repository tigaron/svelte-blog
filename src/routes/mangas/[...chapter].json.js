import { rapidapi } from "$lib/variables.js";
import convert from "$lib/imgproxy.js";

export const GET = async ({ url, params }) => {
	const provider = params.chapter.split("/").pop();
	const manga = url.searchParams.get("manga");
	const chapter = url.searchParams.get("chapter");
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": rapidapi.key,
			"X-RapidAPI-Host": rapidapi.host,
		},
	};
	try {
		const response = await fetch(
			`${rapidapi.url}/fetch/chapter/${provider}/${manga}/${chapter}`,
			options
		);
		const { data: ChapterData } = await response.json();
		const { ChapterTitle, ChapterContent } = ChapterData;
		const images = new Set();
		for await (const element of ChapterContent) {
			const img = convert(element, "resize:fit:600", "webp");
			images.add(img);
		}
		const result = new Map([
			["ChapterTitle", ChapterTitle],
			["ChapterContent", Array.from(images)],
		]);
		return {
			status: 200,
			body: JSON.stringify(Object.fromEntries(result)),
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: error.message },
		};
	}
};
