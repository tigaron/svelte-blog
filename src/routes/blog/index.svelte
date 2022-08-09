<script context="module">
    export const load = async ({ fetch }) => {
        const response = await fetch("/posts.json");
        const result = await response.json();
        return { props: { data: result.data } };
    }
</script>

<script>
    import Time from "svelte-time";
    import Header from "$lib/Header.svelte";

    export let title = "Welcome to my blog!";
    export let type = "blog";
    
    export let data;
    let blogPosts = data;
    $: blogPosts = data;
</script>

<Header title={title} type={type}/>

<main class="main">
    <h2 class="blog-posts">
        Latest posts
    </h2>
    <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        {#each blogPosts as post}
            <li class="py-8">
                <article>
                    <div class="space-y-2 xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                        <dl class="flex">
                            <dt class="sr-only">Author</dt>
                            <dd class="tag-item text-base font-medium leading-6 capitalize">
                                {post.attributes.author.data.attributes.username}
                            </dd>
                            <dt class="tag-item sr-only">Published on</dt>
                            <dd class="tag-item text-base font-medium leading-6">
                                <Time timestamp={post.attributes.publishedAt}/>
                            </dd>
                        </dl>
                        <div class="space-y-4 xl:col-span-3">
                            <div class="space-y-4">
                                <h3 class="text-2xl font-bold leading-8 tracking-tight">
                                    <a href="/blog/{post.attributes.slug}">{post.attributes.title}</a>
                                </h3>
                                <div class="flex flex-wrap">
                                    {#each post.attributes.tags.data as tag}
                                        <a class="tag-item text-sm font-medium uppercase text-primary-500" href="/blog/tag/{tag.attributes.slug}">{tag.attributes.title}</a>
                                    {/each}
                                </div>
                                <p class="max-w-none">{post.attributes.excerpt}</p>
                            </div>
                            <div class="text-base font-medium leading-6">
                                <a class="text-primary-500" href="/blog/{post.attributes.slug}">Read more ➜</a>
                            </div>
                        </div>
                    </div>
                </article>
            </li>
        {/each}
    </ul>
</main>