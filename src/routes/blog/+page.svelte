<script lang="ts">
	/** @type {import('./$types').PageData} */
	import type { post } from '$lib/utils/post.type';
	import Article from '$lib/components/Blog/Article.svelte'
	import Header from '$lib/components/Header.svelte'
	export let data: { data: Array<post> };
	let { data: blogPosts } = data;
</script>

<Header title="My personal blog" isBlog={true} />
<main class="main">
	<h2 class="pb-6 font-extrabold text-3xl tracking-tight md:text-4xl border-b border-gray-700 dark:border-gray-200">
		Latest posts
	</h2>
	<ul class="divide-y divide-gray-200 dark:divide-gray-700">
		{#each blogPosts as post}
			<Article post={post} />
		{/each}
	</ul>
</main>
