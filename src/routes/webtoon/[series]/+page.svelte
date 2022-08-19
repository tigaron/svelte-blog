<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Header from '$lib/components/Header.svelte';
	export let data;
</script>

<Header title={data.MangaTitle} isBlog={false} />
<main class="main">
	<div
		class="lg:grid lg:grid-auto-rows-min lg:grid-cols-12 lg:gap-x-4 pb-4 border-b-2 border-gray-700 dark:border-gray-200"
	>
		<div class="lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1">
			<img src={data.Thumbnail} alt="Cover of {data.MangaTitle}" class="cover" />
		</div>
		<div class="mt-4 lg:col-span-7 lg:mt-0 space-y-2">
			<h2 class="novel-head">Synopsis</h2>
			<div class="svelte-html max-w-full lg:mt-0 space-y-2">
				<p>{data.MangaSynopsis}</p>
			</div>
		</div>
	</div>

	<section class="space-y-2">
		<h3 class="novel-head">Latest Chapters</h3>
		<div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-10 gap-y-2">
			{#each data.ChapterList as Chapter}
				<a
					href="/webtoon/{data.MangaSlug}/{Chapter.ChapterSlug}?provider={data.Provider}"
					class="flex flex-col visited:text-orange-700 hover:text-orange-700 pb-1 border-b border-gray-700 dark:border-gray-200"
				>
					<span class="font-semibold">{Chapter.ChapterNumber}</span>
					<span class="font-normal">{Chapter.ChapterDate}</span>
				</a>
			{/each}
		</div>
	</section>
</main>

<style lang="postcss">
	.svelte-html p {
		@apply font-normal text-base;
	}
</style>
