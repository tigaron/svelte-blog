<script context="module">
	export const load = async ({ fetch, url, params }) => {
		const source = params.chapter.split("/").pop();
		const manga = url.searchParams.get("manga");
		const chapter = url.searchParams.get("chapter");
		const response = await fetch(`/mangas/chapter/${source}.json?manga=${manga}&chapter=${chapter}`);
		const result = await response.json();
		return { props: { data: result } };
	};
</script>

<script>
	import Header from "$lib/Header.svelte";

	export let data;
	let chapterData = data;

	export let type = "post";
	export let title = chapterData.ChapterTitle;

	$: {
		chapterData = data;
		title = chapterData.ChapterTitle;
	}
</script>

<Header {title} {type} />

<main class="main space-y-2 -mt-4">
	{#each chapterData.ChapterContent as img}
		<img class="w-full" src={img} alt={title} />
	{/each}
</main>
