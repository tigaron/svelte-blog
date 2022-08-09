<script context="module">
    export const load = async ({ fetch, url, params }) => {
        const source = params.slug;
	    const slug = url.searchParams.get("slug").split(" ").join("+");
        const response = await fetch(`/mangas/${source}.json?slug=${slug}`);
        const result = await response.json();
        return {
            props: {
                data : {
                    Title: result.Title,
                    Cover: result.Cover,
                    Synopsis: result.Synopsis,
                    Source: source,
                    Chapters: result.Chapters
                }
            }
        }
    }
</script>

<script>
    import Header from "$lib/Header.svelte";
    
    export let data;
    let mangaData = data;

    export let type = "post";
    export let title = mangaData.Title;

    $: {
        mangaData = data;
        title = mangaData.Title;
    }
</script>

<Header title={title} type={type}/>

<main class="main space-y-2 -mt-4">
    <div class="lg:grid lg:grid-auto-rows-min lg:grid-cols-12 lg:gap-x-4 pb-4 border-b-2 border-gray-700 dark:border-gray-200">
        <div class="lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1">
            <img
                src="{mangaData.Cover}"
                alt="Cover of {title}"
                class="cover"
            >
        </div>
        <div class="mt-4 lg:col-span-7 lg:mt-0 space-y-2">
            <h2 class="novel-head">Synopsis</h2>
            <div class="svelte-html max-w-full lg:mt-0 space-y-2">
                <p>{mangaData.Synopsis}</p>
            </div>
        </div>
    </div>

    <section class="space-y-2">
        <h3 class="novel-head">Latest Chapters</h3>
        <div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-10 gap-y-2">
            {#each mangaData.Chapters as Chapter}
                <a
                    href="/manga/chapter/{mangaData.Source}?slug={Chapter.Slug}"
                    class="flex flex-col visited:text-primary-700 hover:text-primary-700 pb-1 border-b border-gray-700 dark:border-gray-200"
                >
                    <span class="truncate font-semibold">{Chapter.Title}</span>
                </a>
            {/each}
        </div>
    </section>
</main>

<style>
    .svelte-html p {
        @apply font-normal text-base;
    }
</style>