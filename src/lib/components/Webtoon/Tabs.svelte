<script lang="ts">
	import Provider from './Provider.svelte';
	export let data;
	let items = [
		{ label: 'Alpha Scans', value: 1, props: { provider: 'alpha', data: data.alpha } },
		{ label: 'Asura Scans', value: 2, props: { provider: 'asura', data: data.asura } },
		{ label: 'Flame Scans', value: 3, props: { provider: 'flame', data: data.flame } },
		{ label: 'Luminous Scans', value: 4, props: { provider: 'luminous', data: data.luminous } },
		{ label: 'Realm Scans', value: 5, props: { provider: 'realm', data: data.realm } },
		{ label: 'Omega Scans', value: 6, props: { provider: 'omega', data: data.omega } },
	];
	export let activeTabValue = 2;
	function changeActiveTab(tabValue: number) {
		return function () {
			activeTabValue = tabValue;
		};
	}
</script>

<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
	<ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
		{#each items as item}
			<li class="mr-2" role="presentation">
				<button
					class={activeTabValue == item.value
						? 'inline-block p-4 rounded-t-lg border-b-2 text-orange-600 hover:text-orange-600 dark:text-orange-500 dark:hover:text-orange-500 border-orange-600 dark:border-orange-500'
						: 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700'}
					type="button"
					on:click={changeActiveTab(item.value)}>{item.label}</button
				>
			</li>
		{/each}
	</ul>
</div>

<div>
	{#each items as item}
		{#if activeTabValue == item.value}
			<svelte:component this={Provider} {...item.props} />
		{/if}
	{/each}
</div>
