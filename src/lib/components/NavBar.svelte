<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

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

<nav
	class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
>
	<div class="container flex flex-wrap justify-between items-center mx-auto">
		<a href="/" class="flex items-center">
			<img
				src="./fls-logo-{darkMode ? 'white' : 'black'}.png"
				class="mr-3 h-6 sm:h-9"
				alt="Four Leaves Studio Logo"
			/>
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>Four Leaves Studio</span
			>
		</a>
		<div class="flex md:order-2">
			<button
				type="button"
				on:click={toggleDark}
				class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
			>
				<svg
					class="{darkMode ? 'block' : 'hidden'} w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg
				>
				<svg
					class="{darkMode ? 'hidden' : 'block'} w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
						fill-rule="evenodd"
						clip-rule="evenodd"
					/></svg
				>
			</button>
			<button
				type="button"
				on:click={toggleMenu}
				class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-sticky"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
		<div
			class="{menuExpand
				? 'block'
				: 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1"
		>
			<ul
				class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
			>
				<li>
					<a
						href="/#"
						class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
						aria-current="page">Home</a
					>
				</li>
				<li>
					<a
						href="/#"
						class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
						>Blog</a
					>
				</li>
				<li>
					<a
						href="/#"
						class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
						>Project</a
					>
				</li>
				<li>
					<button
						on:click={toggleDropdown}
						class="flex justify-between items-center relative py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
						>Library <svg
							class="ml-1 w-5 h-5"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						></button
					>
					<!-- Dropdown menu -->
					<div
						class="{dropdownExpand ? 'block' : 'hidden'} absolute origin-top mt-2 z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
					>
						<ul
							class="py-1 text-sm text-gray-700 dark:text-gray-400"
							aria-labelledby="dropdownDefault"
						>
							<li>
								<a
									href="/#"
									class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>Novel</a
								>
							</li>
							<li>
								<a
									href="/#"
									class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>Webtoon</a
								>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
</nav>
