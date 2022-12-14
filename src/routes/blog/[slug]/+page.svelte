<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Time from 'svelte-time';
	import Header from '$lib/components/Header.svelte'
	import type { post } from '$lib/utils/post.type';
	export let data: { data: post };
	let { data: post } = data;

	onMount(function () {
		let headings = document.getElementsByTagName('h2');
		let toc = document.getElementById('toc');
		for (let heading of headings) {
			let headingSlug = heading.innerText.split(' ').join('-').toLowerCase();
			heading.setAttribute('id', headingSlug);
			let list = document.createElement('li');
			let anchor = document.createElement('a');
			anchor.setAttribute('href', '#' + headingSlug);
			anchor.setAttribute('class', 'text-lg font-normal no-underline');
			anchor.textContent = heading.innerText;
			list.appendChild(anchor);
			toc!.appendChild(list);
		}
	});
</script>

<main class="main">
	<div class="text-center mx-auto">
		{#each post.attributes.tags.data as tag}
			<a
				class="tag-item text-sm inline-block font-medium uppercase text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
				href="/blog/tag/{tag.attributes.slug}">{tag.attributes.title}</a
			>
		{/each}
	</div>
	<Header title={post.attributes.title} />
	<div class="mx-auto max-w-3xl px-6 sm:px-6 xl:max-w-5xl xl:px-0">
		<dl class="flex justify-center border-b pb-2">
			<dt class="sr-only">Author</dt>
			<dd class="tag-item text-base font-medium leading-6 capitalize">
				{post.attributes.author.data.attributes.username}
			</dd>
			<dt class="tag-item sr-only">Published on</dt>
			<dd class="tag-item text-base font-medium leading-6">
				<Time timestamp={post.attributes.publishedAt} />
			</dd>
		</dl>
	</div>
	<details class="p-4 my-2 bg-gray-200 dark:bg-gray-800 rounded-md w-full">
		<summary class="text-xl font-bold w-full cursor-pointer">Table of Contents</summary>
		<ol id="toc" class="list-decimal list-inside pl-0 sm:pl-6">
			<!-- Populate onMount -->
		</ol>
	</details>

	<article class="svelte-html space-y-4">
		<SvelteMarkdown source={post.attributes.content} />
	</article>
</main>

<style>
	.svelte-html :global(h2) {
		@apply text-2xl font-bold tracking-tight pb-1 border-b-2 border-gray-200;
	}

	.svelte-html :global(p),
	.svelte-html :global(li) {
		@apply font-serif font-medium text-left max-w-none;
	}

	.svelte-html :global(a) {
		@apply text-orange-500 underline underline-offset-2;
	}

	.svelte-html :global(ol),
	.svelte-html :global(ul) {
		padding: revert;
		margin: revert;
		list-style: disc;
	}

	.svelte-html :global(pre) {
		@apply py-3 px-5 rounded-md text-base whitespace-pre overflow-auto bg-gray-800 text-green-400 mt-2;
	}

	.svelte-html :global(pre) :global(code) {
		@apply block overflow-auto;
	}

	.svelte-html :global(code) {
		@apply bg-gray-800 text-green-400 p-0.5;
	}

	.svelte-html :global(table) {
		@apply block overflow-auto;
	}

	.svelte-html :global(td),
	.svelte-html :global(th) {
		@apply font-mono text-base py-1 px-2 border border-white text-green-400 bg-gray-800;
	}

	.tag-item + .tag-item::before {
		content: '\02022';
		@apply px-2 py-0 font-serif;
	}
</style>
