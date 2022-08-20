<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Header from '$lib/components/Header.svelte';
	import Image from '$lib/components/Webtoon/Image.svelte';
	import ReadingSettings from "$lib/components/ReadingSettings.svelte";
	export let data;
	let showSettings = true;
	function toogleSettings() {
		showSettings = !showSettings;
	}
</script>

<div on:click={toogleSettings} class="w-full">
	<Header title={data.ChapterTitle} isBlog={false} />
	<main class="min-h-screen max-w-2xl py-2 px-6 xl:px-0 mx-auto">
		{#each data.ChapterContent as img}
		<Image src={img} alt={data.ChapterTitle} />
	{/each}
	</main>
</div>
<ReadingSettings Provider={data.Provider} MangaSlug={data.MangaSlug} ChapterTitle={data.ChapterTitle} PrevChapter={data.PrevChapter} NextChapter={data.NextChapter} {showSettings} />
