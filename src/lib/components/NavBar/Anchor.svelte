<script lang="ts">
	export let href: string;
	export let label: string;
	export let current: Boolean;
</script>

<li>
	<a
		href={href}
		class="block py-2 pr-4 pl-3 md:p-0 font-medium {current ? 'text-orange-700' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}"
	>
		{label}
	</a>
</li>
