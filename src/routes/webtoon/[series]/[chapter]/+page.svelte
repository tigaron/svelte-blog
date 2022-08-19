<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Header from '$lib/components/Header.svelte';
	import Image from '$lib/components/Webtoon/Image.svelte';
	export let data;
</script>

<Header title={data.ChapterTitle} isBlog={false} />
<main class="main">
	{#each data.ChapterContent as img}
	<Image src={img} alt={data.ChapterTitle} />
	{/each}
</main>
