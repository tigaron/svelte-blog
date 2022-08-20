<script lang="ts">
	/** @type {import('./$types').PageData} */
	import SvelteMarkdown from "svelte-markdown";
	import Time from "svelte-time";
	import Header from '$lib/components/Header.svelte';
	export let data;
	let { data: novel } = data;
</script>

<Header title={novel.attributes.title} isBlog={false} />
<main class="main space-y-2 -mt-4">
	<div class="lg:grid lg:grid-auto-rows-min lg:grid-cols-12 lg:gap-x-4 pb-4 border-b-2 border-gray-700 dark:border-gray-200">
		<div class="lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1">
			<img
				src="{novel.attributes.cover.data.attributes.url}"
				alt="Cover of {novel.attributes.title}"
				class="cover"
			>
		</div>
		<div class="mt-4 lg:col-span-7 lg:mt-0 space-y-2">
			<h2 class="novel-head">Synopsis</h2>
			<div class="svelte-html max-w-full lg:mt-0 space-y-2">
				<SvelteMarkdown source={novel.attributes.content} />
			</div>
		</div>
	</div>

	<section class="space-y-2">
		<h3 class="novel-head">Latest Chapters</h3>
		<div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-10 gap-y-2">
			{#each novel.attributes.chapters.data as chapter}
				<a
					href="/novel/{novel.attributes.slug}/{chapter.attributes.slug}"
					class="flex flex-col visited:text-orange-700 hover:text-orange-700 pb-1 border-b border-gray-700 dark:border-gray-200"
				>
					<span class="truncate font-semibold">{chapter.attributes.title}</span>
					<span class="text-sm"><Time timestamp={chapter.attributes.publishedAt} /> • {chapter.attributes.readingTime}</span>
				</a>
			{/each}
		</div>
	</section>
</main>

<style>
	.svelte-html :global(p) {
		@apply font-normal text-base;
	}
</style>