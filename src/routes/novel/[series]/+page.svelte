<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Header from '$lib/components/Header.svelte';
	export let data;
	let { pages, posts } = data;
</script>

<Header title={pages[0].title} isBlog={false} />
<main class="main space-y-2 -mt-4">
	<div class="lg:grid lg:grid-auto-rows-min lg:grid-cols-12 lg:gap-x-4 pb-4 border-b-2 border-gray-700 dark:border-gray-200">
		<div class="lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1">
			<img
				src="{pages[0].feature_image}"
				alt="Cover of {pages[0].title}"
				class="cover"
			>
		</div>
		<div class="mt-4 lg:col-span-7 lg:mt-0 space-y-2">
			<h2 class="novel-head">Synopsis</h2>
			<div class="svelte-html max-w-full lg:mt-0 space-y-2">
				{@html pages[0].html}
			</div>
		</div>
	</div>

	<section class="space-y-2">
		<h3 class="novel-head">Latest Chapters</h3>
		<div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-10 gap-y-2">
			{#each posts as chapter}
				<a
					sveltekit:reload
					href="/novel/{pages[0].slug}/{chapter.slug}"
					class="flex flex-col visited:text-orange-700 hover:text-orange-700 pb-1 border-b border-gray-700 dark:border-gray-200"
				>
					<span class="truncate font-semibold">{chapter.title}</span>
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