<script lang="ts">
	export let toggleDropdown: VoidFunction;
	export let dropdownExpand: Boolean;
</script>

<li>
	<button on:click={toggleDropdown} class="flex justify-between relative items-center w-full py-2 pr-4 pl-3 font-medium md:w-auto md:p-0 text-gray-500 hover:text-gray-900 dark:hover:text-white">
		<span>Library </span>
		<svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	<div class="{dropdownExpand ? 'visible opacity-100' : 'invisible opacity-0'}">
		<ul class="py-1 text-sm absolute origin-top mt-2 z-10 w-44 font-normal rounded divide-y text-gray-700 dark:text-gray-400 bg-gray-100 divide-gray-200 shadow dark:bg-gray-700 dark:divide-gray-600">
			<li>
				<a href="/novel" class="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white">Novel</a>
			</li>
			<li>
				<a href="/webtoon" class="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white">Webtoon</a>
			</li>
		</ul>
	</div>
</li>
