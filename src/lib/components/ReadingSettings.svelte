<script lang="ts">
	export let showSettings: Boolean;
	export let Provider: string;
	export let MangaSlug: string;
	export let ChapterTitle: string;
	export let PrevChapter: string | null;
	export let NextChapter: string | null;
</script>

<div class="{showSettings ? 'flex' : 'hidden'} bg-white dark:bg-gray-900 fixed inset-x-0 bottom-0 z-[1000] w-full justify-center border-t leading-6 shadow-inner mx-auto">
	<div class="flex max-w-3xl xl:max-w-5xl w-full items-center justify-between">
		<div class="hidden h-full w-full max-w-full flex-grow flex-col flex-wrap justify-center overflow-hidden md:flex">
			<div class="max-w-none flex-row md:pl-7">
				<p class="text-sm font-semibold">{ChapterTitle}</p>
			</div>
		</div>
		<div class="w-full flex flex-row flex-wrap items-center justify-between">
			<div class="flex flex-1 flex-wrap items-center justify-start md:justify-end">
				<div class="flex-row ml-4 md:ml-0">
					<a
						href="/webtoon/{MangaSlug}?provider={Provider}"
						class="inline-flex h-12 min-w-0 flex-1 flex-col items-center justify-center py-3 px-1 text-center align-middle text-xs normal-case leading-3 hover:text-primary-700"
					>
						<svg class="w-6" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21H15M9 21V17C9 15.3431 10.3431 14 12 14V14C13.6569 14 15 15.3431 15 17V21M9 21H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</a>
				</div>
				<div class="flex-row md:ml-0">
					<a
						href="#top"
						class="inline-flex h-12 min-w-0 flex-1 flex-col items-center justify-center py-3 px-1 text-center align-middle text-xs normal-case leading-3 hover:text-primary-700"
					>
						<svg class="w-6" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.5 16.5L12 13L15.5 16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M8.5 10.5L12 7L15.5 10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</a>
				</div>
				<div class="flex-row">
					<a
						href="#comment"
						class="inline-flex h-12 min-w-0 flex-1 flex-col items-center justify-center py-3 px-1 text-center align-middle text-xs normal-case leading-3 hover:text-primary-700"
					>
						<svg class="w-6" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</a>
				</div>
			</div>
			<div class="flex flex-row flex-wrap justify-end">
				<div class="flex-row">
					{#if PrevChapter === null}
						<button disabled class="opacity-25 relative inline-flex h-12 min-w-0 flex-1 flex-row items-center justify-center py-3 px-3 text-center align-middle text-xs normal-case leading-3">
							<svg class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
							</svg>
							<span class="font-medium">PrevChapter</span>
						</button>
					{:else}
						<a sveltekit:reload href="/webtoon/{MangaSlug}/{PrevChapter}" class="relative inline-flex h-12 min-w-0 flex-1 flex-row items-center justify-center py-3 px-3 text-center align-middle text-xs normal-case leading-3">
							<svg class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
							</svg>
							<span class="font-medium">PrevChapter</span>
						</a>
					{/if}
				</div>
				<div class="flex-row">
					{#if NextChapter === null}
						<button disabled class="opacity-25 relative inline-flex h-12 min-w-0 flex-1 flex-row items-center justify-center py-3 px-3 text-center align-middle text-xs normal-case leading-3">
							<span class="font-medium">NextChapter</span>
						<svg class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
							<path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
						</svg>
						</button>
					{:else}
						<a sveltekit:reload href="/webtoon/{MangaSlug}/{NextChapter}" class="relative inline-flex h-12 min-w-0 flex-1 flex-row items-center justify-center py-3 px-3 text-center align-middle text-xs normal-case leading-3">
							<span class="font-medium">NextChapter</span>
						<svg class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
							<path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
						</svg>
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>