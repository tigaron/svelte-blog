<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Header from '$lib/components/Header.svelte';
	import Tabs from '$lib/components/Webtoon/Tabs.svelte';
	export let data;
</script>

<Header title="Webtoon Collection" isBlog={false} />
<main class="main">
	<Tabs data={data} />
</main>
