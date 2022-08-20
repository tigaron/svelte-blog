<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
</script>

<div class="main">
	<Header title="{$page.status}: {$page.error.message}" isBlog={false} />
</div>
