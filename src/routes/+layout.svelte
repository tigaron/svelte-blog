<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<NavBar />

<slot />

<Footer />
