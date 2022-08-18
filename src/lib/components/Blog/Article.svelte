<script lang="ts">
	import type { post } from '$lib/utils/post.type'
	export let post: post
</script>

<li class="py-8">
	<article>
		<div class="space-y-2 xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
			<div class="space-y-4 xl:col-span-3">
				<div class="space-y-4">
					<div class="flex flex-wrap">
						{#each post.attributes.tags.data as tag}
							<a class="tag-item text-sm font-medium uppercase text-orange-500 hover:text-orange-700" href="/blog/tag/{tag.attributes.slug}">
								{tag.attributes.title}
							</a>
						{/each}
					</div>
					<h3 class="text-2xl font-bold leading-8 tracking-tight">
						<a href="/blog/{post.attributes.slug}">
							{post.attributes.title}
						</a>
					</h3>
					<p class="max-w-none">{post.attributes.excerpt}</p>
				</div>
				<div class="text-base font-medium leading-6">
					<a class="text-orange-500 hover:text-orange-700" href="/blog/{post.attributes.slug}">Read more ➜</a>
				</div>
			</div>
		</div>
	</article>
</li>

<style lang="postcss">
	.tag-item + .tag-item::before {
		content: '\02022';
		@apply px-2 py-0;
	}
</style>