<script lang="ts">
	import Hero from '$lib/components/Blog/Hero.svelte'
	export let title: string;
	export let isBlog: Boolean;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Four Leaves Studio - {title}">
	<meta property="og:title" content="{title}">
</svelte:head>

<header class="mt-20">
	{#if isBlog}
		<Hero />
	{:else}
	<h1 class="text-3xl pt-2 pb-4 font-semibold text-center leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md-leading-14">
		{title}
	</h1>
	{/if}
</header>