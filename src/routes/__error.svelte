<script context="module">
    export const load = ({ error, status }) => {
        return { props: { error, status } };
    };
</script>

<script>
    import Header from "$lib/Header.svelte";
    
    export let error;
    export let status;
    export let title = `Error ${status}`;
    export let type = "post";
</script>

<Header title={title} type={type}/>

<main class="main space-y-2 border-t">
    <p>{error.message}</p>
</main>