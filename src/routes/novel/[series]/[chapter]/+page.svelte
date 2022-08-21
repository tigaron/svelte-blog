<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Time from "svelte-time";
	import SvelteMarkdown from "svelte-markdown";
	import Header from '$lib/components/Header.svelte';
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
		<div class="flex w-full flex-wrap place-content-between items-center gap-4 -mt-4 pb-4 border-b">
			<div>
				<a href="/novel/{chapterData.novelSlug}">
					<span class="inline-block rounded py-1 px-2 text-xs font-semibold border">
						{chapterData.novelTitle}
					</span>
				</a>
			</div>
			<dl>
				<div class="flex flex-row items-center gap-2 text-sm font-semibold">
					<dt class="sr-only">Published on</dt>
					<dd><Time timestamp={chapterData.publishedAt}/></dd>
					<span>•</span>
					<span>{chapterData.readingTime}</span>
				</div>
			</dl>
		</div>

		<div on:click={toogleSettings} class="svelte-html max-w-none pb-10 font-medium font-serif text-left space-y-2">
			<p class="truncate">Source: <span class="font-bold">{chapterData.source}</span></p>
			<div><i class="border-l"></i></div>
			<SvelteMarkdown source={chapterData.content} />
		</div>

		<div id="comment" class="flex items-center justify-center pb-16">
			<button id="load-comments" class="bg-primary-500 rounded-md font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black py-3 px-4 text-xs uppercase">Load Comments</button>
		</div>
		{#each data.ChapterContent as img}

		{/each}
	</main>
</div>

<ReadingSettings Provider={data.} MangaSlug={data.} ChapterTitle={data.} PrevChapter={data.} NextChapter={data.} {showSettings} />
