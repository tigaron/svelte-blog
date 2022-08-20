<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Header from '$lib/components/Header.svelte';
	export let data;
	let { data: novels } = data;
</script>

<Header title="Novel Collection" isBlog={false} />
<main class="main">
	<div class="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 md:grid-cols-3 xl:gap-x-8">
		{#each novels as novel}
			<a href="/novel/{novel.attributes.slug}" class="transform rounded-md transition duration-500 hover:scale-105">
				<div class="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-md">
					<img src={novel.attributes.cover.data.attributes.url} alt="Cover of {novel.attributes.title}" />
				</div>
				<div class="min-h-16 py-4">
					<h3 class="text-center text-sm font-bold hover:text-orange-700 md:text-base">
						{novel.attributes.title}
					</h3>
				</div>
			</a>
		{/each}
	</div>
</main>
