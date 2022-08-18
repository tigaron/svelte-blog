<script lang="ts">
	/** @type {import('./$types').PageData} */
	import type { post } from '$lib/utils/post.type';
	export let data: { data: Array<post> };
	let { data: blogPosts } = data;
</script>

<main class="main">
	<h2 class="blog-posts">Latest posts</h2>
	<ul class="divide-y divide-gray-200 dark:divide-gray-700">
		{#each blogPosts as post}
			<li class="py-8">
				<article>
					<div class="space-y-2 xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
						<div class="space-y-4 xl:col-span-3">
							<div class="space-y-4">
								<h3 class="text-2xl font-bold leading-8 tracking-tight">
									<a href="/blog/{post.attributes.slug}">{post.attributes.title}</a>
								</h3>
								<div class="flex flex-wrap">
									{#each post.attributes.tags.data as tag}
										<a
											class="tag-item text-sm font-medium uppercase text-orange-500"
											href="/blog/tag/{tag.attributes.slug}">{tag.attributes.title}</a
										>
									{/each}
								</div>
								<p class="max-w-none">{post.attributes.excerpt}</p>
							</div>
							<div class="text-base font-medium leading-6">
								<a class="text-orange-500" href="/blog/{post.attributes.slug}">Read more ➜</a>
							</div>
						</div>
					</div>
				</article>
			</li>
		{/each}
	</ul>
</main>
