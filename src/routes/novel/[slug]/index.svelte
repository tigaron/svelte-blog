<script context="module">
    export const load = async ({ fetch, params }) => {
        const { slug } = params;
        const response = await fetch(`/novels/${slug}.json`);
        const result = await response.json();
        return {
            props: {
                data : {
                    title: result.data.attributes.title,
                    slug: result.data.attributes.slug,
                    content: result.data.attributes.content,
                    cover: result.data.attributes.cover.data.attributes.url,
                    chapters: result.data.attributes.chapters.data
                }
            }
        }
    }
</script>

<script>
    import SvelteMarkdown from "svelte-markdown";
    import Time from "svelte-time";
    import Header from "$lib/Header.svelte";
    
    export let data;
    let novelData = data;

    export let type = "post";
    export let title = novelData.title;

    $: {
        novelData = data;
        title = novelData.title;
    }
</script>

<Header title={title} type={type}/>

<main class="main space-y-2 -mt-4">
    <div class="lg:grid lg:grid-auto-rows-min lg:grid-cols-12 lg:gap-x-4 pb-4 border-b-2 border-gray-700 dark:border-gray-200">
        <div class="lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1">
            <img
                src="{novelData.cover}"
                alt="Cover of {title}"
                class="cover"
            >
        </div>
        <div class="mt-4 lg:col-span-7 lg:mt-0 space-y-2">
            <h2 class="novel-head">Synopsis</h2>
            <div class="svelte-html max-w-full lg:mt-0 space-y-2">
                <SvelteMarkdown source={novelData.content} />
            </div>
        </div>
    </div>

    <section class="space-y-2">
        <h3 class="novel-head">Latest Chapters</h3>
        <div class="flex flex-col sm:grid sm:grid-cols-2 space-x-0 sm:space-x-6 space-y-2">
            {#each novelData.chapters as chapter}
                <a
                    href="/novel/{novelData.slug}/{chapter.attributes.slug}"
                    class="flex flex-col visited:text-primary-700 hover:text-primary-700 pb-1 border-b border-gray-700 dark:border-gray-200"
                >
                    <span class="truncate font-semibold">{chapter.attributes.title}</span>
                    <span class="text-sm"><Time timestamp={chapter.attributes.publishedAt}/> • {chapter.attributes.readingTime}</span>
                </a>
            {/each}
        </div>
    </section>
</main>

<style>
    .svelte-html :global(p) {
        @apply font-normal text-base;
    }
</style>