<script context="module">
    export const load = async ({ fetch }) => {
        const response = await fetch("/mangas.json");
        const result = await response.json();
        return { props: { data: result } };
    }
</script>

<script>
    import Header from "$lib/Header.svelte";

    export let title = "My Manga Collection";
    export let type = "post";

    export let data;
    let mangas = data;
    $: mangas = data;
</script>

<Header title={title} type={type}/>

<main class="main">
    <div class="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 md:grid-cols-3 xl:gap-x-8">
        {#each mangas as manga}
            <a
                href="/manga/asura?slug={manga.EntrySlug}"
                class="transform rounded-md transition duration-500 hover:scale-105"
            >
                <div class="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-md">
                    <img
                        src="{manga.Thumbnail}"
                        alt="Cover of {manga.MangaTitle}"
                    >
                </div>
                <div class="min-h-16 py-4">
                    <h3 class="text-center text-sm font-bold hover:text-primary-700 md:text-base">{manga.MangaTitle}</h3>
                </div>
            </a>
        {/each}
    </div>
</main>