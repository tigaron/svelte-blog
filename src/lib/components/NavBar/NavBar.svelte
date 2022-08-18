<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import Anchor from './Anchor.svelte';
	import DarkMode from './DarkMode.svelte';
	import Dropdown from './Dropdown.svelte';
	import Hamburger from './Hamburger.svelte';

	let darkMode: Boolean;
	onMount(function () {
		if (document.documentElement.className === 'dark') {
			darkMode = true;
		} else {
			darkMode = false;
		}
	});
	function toggleDark() {
		darkMode = !darkMode;
		if (darkMode) {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		}
	}

	let menuExpand = false;
	function toggleMenu() {
		menuExpand = !menuExpand;
	}
	beforeNavigate(function () {
		menuExpand = false;
	});

	let dropdownExpand = false;
	function toggleDropdown() {
		dropdownExpand = !dropdownExpand;
	}
	beforeNavigate(function () {
		dropdownExpand = false;
	});
</script>

<nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
	<div class="md:max-w-3xl xl:max-w-5xl mx-auto">
		<div class="container flex flex-wrap justify-between items-center mx-auto">
			<a href="/" class="flex items-center">
				<img
					src="/fls-logo-{darkMode ? 'white' : 'black'}.png"
					class="mr-3 h-6 sm:h-9"
					alt="Four Leaves Studio Logo"
				/>
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
					>Four Leaves Studio</span
				>
			</a>
			<div class="flex md:order-2">
				<DarkMode {toggleDark} {darkMode} />
				<Hamburger {toggleMenu} />
			</div>
			<div class="{menuExpand ? 'block' : 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1">
				<ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
					<Anchor href="/" label="Home" current={$page.url.pathname === "/"} />
					<Anchor href="/blog" label="Blog" current={$page.url.pathname.includes("/blog")} />
					<Anchor href="/project" label="Project" current={$page.url.pathname === "/project"} />
					<Dropdown {toggleDropdown} {dropdownExpand} />
				</ul>
			</div>
		</div>
	</div>
</nav>
