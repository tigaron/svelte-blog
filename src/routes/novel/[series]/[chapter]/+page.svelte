<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Header from '$lib/components/Header.svelte';
	export let data;
	let chapter = data.posts[0];
</script>

<div class="w-full">
	<Header title={chapter.title} isBlog={false} />
	<main class="min-h-screen max-w-2xl py-2 px-6 xl:px-0 mx-auto">
		<div class="flex w-full flex-wrap place-content-between items-center gap-4 -mt-4 pb-4 border-b">
			<div>
				<a sveltekit:reload href="/novel/{chapter.primary_tag.slug}">
					<span class="inline-block rounded py-1 px-2 text-xs font-semibold border">
						{chapter.primary_tag.name}
					</span>
				</a>
			</div>
			<div class="flex flex-row items-center gap-2 text-sm font-semibold">
				<span>{chapter.reading_time} mins read</span>
			</div>
		</div>

		<div class="svelte-html max-w-none pb-10 font-medium font-serif text-left space-y-2">
			<p class="truncate">Source: <span class="font-bold">{chapter.tags[1].name}</span></p>
			<div><i class="border-l"></i></div>
			{@html chapter.html}
		</div>

		<div id="comment" class="flex items-center justify-center pb-16">
			<button id="load-comments" class="bg-primary-500 rounded-md font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black py-3 px-4 text-xs uppercase">Load Comments</button>
		</div>
	</main>
</div>
