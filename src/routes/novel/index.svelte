<script context="module">
    export const load = async ({ fetch }) => {
        const response = await fetch("/novels.json");
        const result = await response.json();
        return { props: { data: result.data } };
    }
</script>

<script>
    import { SRC_URL } from "$lib/variables.js";
    import Header from "$lib/Header.svelte";

    export let title = "My Novel Collection";
    export let type = "post";

    export let data;
    let novels = data;
    $: novels = data;
</script>

<Header title={title} type={type}/>

<main class="main">
    <div class="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 md:grid-cols-3 xl:gap-x-8">
        {#each novels as novel}
            <a
                href="/novel/{novel.attributes.slug}"
                class="transform rounded-md transition duration-500 hover:scale-105"
            >
                <div class="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-md">
                    <img
                        src="{SRC_URL}{novel.attributes.cover.data.attributes.url}"
                        alt="Cover of {novel.attributes.title}"
                    >
                </div>
                <div class="min-h-16 py-4">
                    <h3 class="text-center text-sm font-bold hover:text-primary-700 md:text-base">{novel.attributes.title}</h3>
                </div>
            </a>
        {/each}
    </div>
</main>