<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
</script>

<Header title="{$page.status}: {$page.error.message}" isBlog={false} />
