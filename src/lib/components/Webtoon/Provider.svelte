<script lang="ts">
	export let provider: string;
	export let data;
</script>

<div class="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 md:grid-cols-3 xl:gap-x-8">
	{#each data as item}
		<a
			href="/webtoon/{item.EntrySlug}?provider={provider}"
			class="transform rounded-md transition duration-500 hover:scale-105"
		>
			<div class="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-md">
				<img src={item.Thumbnail} alt="Cover of {item.MangaTitle}" />
			</div>
			<div class="min-h-16 py-4">
				<h3 class="text-center text-sm font-bold hover:text-primary-700 md:text-base">
					{item.MangaTitle}
				</h3>
			</div>
		</a>
	{/each}
</div>