<script context="module">
    export const load = async ({ fetch, url, params }) => {
        const source = params.chapter.split("/").pop();
	    const slug = url.searchParams.get("slug");
        const response = await fetch(`/mangas/chapter/${source}.json?slug=${slug}`);
        const result = await response.json();
        return {
            props: {
                data : {
                    Title: result.Title,
                    Content: result.Content
                }
            }
        }
    }
</script>

<script>
    import Header from "$lib/Header.svelte";
    
    export let data;
    let chapterData = data;

    export let type = "post";
    export let title = chapterData.Title;

    $: {
        chapterData = data;
        title = chapterData.Title;
    }
</script>

<Header title={title} type={type}/>

<main class="main space-y-2 -mt-4">
    {#each chapterData.Content as img}
        <img
            class="w-full"
            src={img}
            alt={title}>
    {/each}
</main>