<script context="module">
    export const load = async ({ params , fetch }) => {
        const { slug, chapter } = params;
        const response = await fetch(`/novels/${slug}/${chapter}.json`);
        const result = await response.json();
        const data = {
            slug: result.data.attributes.slug,
            title: result.data.attributes.title,
            order: result.data.attributes.order,
            source: result.data.attributes.source,
            content: result.data.attributes.content,
            publishedAt: result.data.attributes.publishedAt,
            readingTime: result.data.attributes.readingTime,
            novelSlug: result.data.attributes.novel.data.attributes.slug,
            novelTitle: result.data.attributes.novel.data.attributes.title
        }

        const resPrevNext = await fetch(`/novels/${slug}/${chapter}/${data.order}.json`);
        const resultPrevNext = await resPrevNext.json();
        if (resultPrevNext.meta.pagination.total === 2) {
            data.prev = resultPrevNext.data[0].attributes.slug;
            data.next = resultPrevNext.data[1].attributes.slug;
        }
        if (resultPrevNext.meta.pagination.total === 1) {
            data.prev = resultPrevNext.data[0].attributes.order > data.order ? null : resultPrevNext.data[0].attributes.slug;
            data.next = resultPrevNext.data[0].attributes.order < data.order ? null : resultPrevNext.data[0].attributes.slug;
        }
        
        return {
            props: {data}
        }
    }
</script>

<script>
    import Time from "svelte-time";
    import SvelteMarkdown from "svelte-markdown";
    import Header from "$lib/Header.svelte";
    import ReadingSettings from "$lib/ReadingSettings.svelte";

    export let data;
    let chapterData = data;

    export let type = "post";
    export let title = chapterData.title;

    let showSettings = true;
    const toogleSettings = () => showSettings = !showSettings;
    
    $: {
        chapterData = data;
        title = chapterData.title;
    }
</script>

<Header title={title} type={type}/>

<main class="mx-auto max-w-3xl py-6 px-6 sm:px-6 xl:max-w-5xl xl:px-0 space-y-2">
    <div class="flex w-full flex-wrap place-content-between items-center gap-4 -mt-4 pb-4 border-b">
        <div>
            <a href="/novel/{chapterData.novelSlug}">
                <span class="inline-block rounded py-1 px-2 text-xs font-semibold border">
                    {chapterData.novelTitle}
                </span>
            </a>
        </div>
        <dl>
            <div class="flex flex-row items-center gap-2 text-sm font-semibold">
                <dt class="sr-only">Published on</dt>
                <dd><Time timestamp={chapterData.publishedAt}/></dd>
                <span>•</span>
                <span>{chapterData.readingTime}</span>
            </div>
        </dl>
    </div>

    <div on:click={toogleSettings} class="svelte-html max-w-none pb-10 font-medium font-serif text-left space-y-2">
        <p class="truncate">Source: <span class="font-bold">{chapterData.source}</span></p>
        <div><i class="border-l"></i></div>
        <SvelteMarkdown source={chapterData.content} />
    </div>

    <div id="comment" class="flex items-center justify-center pb-16">
        <button id="load-comments" class="bg-primary-500 rounded-md font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black py-3 px-4 text-xs uppercase">Load Comments</button>
    </div>

    <ReadingSettings slug="/novel/{chapterData.novelSlug}" title={title} prev={chapterData.prev} next={chapterData.next} {showSettings} />
</main>

<style>
    .svelte-html :global(p) {
        @apply font-normal text-base;
    }
</style>