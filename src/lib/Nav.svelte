<script>
    import { onMount } from 'svelte';
    import { beforeNavigate } from '$app/navigation';
    export const navLinks = [
        {name: "Home", url: "/"},
        {name: "Blog", url: "/blog"},
        {name: "Project", url: "/project"}
    ];
    export const libLinks = [
        {name: "Novel", url: "/novel"},
        {name: "Manga", url: "/manga"},
    ];

    let darkMode;
    onMount(() => {
        if (document.documentElement.className === 'dark') {
            darkMode = true;
        } else {
            darkMode = false;
        }
    });
    const toggleDark = () => {
        darkMode = !darkMode;
        if (darkMode) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
            document.documentElement.style.cssText = 'color-scheme: dark';
        } else {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
            document.documentElement.style.cssText = 'color-scheme: light';
        };
    }

    let open = false;
    const toggleOpen = () => open = !open;
    beforeNavigate(() => {
        open = false
    });
</script>

<nav id="top" class="border-b border-gray-700 dark:border-gray-200">
    <!-- Primary Navigation Menu -->
    <div class="mx-auto max-w-3xl px-6 sm:px-6 xl:max-w-5xl xl:px-0">
        <div class="flex h-16 justify-between">
            <div class="flex">
                <!-- Logo -->
                <div class="flex shrink-0 items-center">
                    <a href="/">
                        <img
                            src="/fls-logo-{darkMode ? 'white' : 'black'}.png"
                            alt="Logo of Four Leaves Studio"
                            class="h-9 w-auto"
                        >
                    </a>
                </div>
                <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    {#each navLinks as link}
                        <a
                            href={link.url}
                            class="inline-flex items-center px-1 pt-1 font-bold text-base leading-5 transform"
                        >
                            {link.name}
                        </a>
                    {/each}
                    <div class="dropdown">
                        <span class="w-full h-full flex items-center">Library</span>
                        <ul class="dropdown-content bg-white dark:bg-gray-900 border-l border-r border-b border-gray-900 dark:border-white">
                            {#each libLinks as link}
                                <li class="p-2"><a href={link.url}>{link.name}</a></li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
                <button class="ml-2 flex items-center justify-center" on:click={toggleDark}>
                    <svg
                        class="{darkMode ? 'hidden' : 'block'} h-4 w-4 cursor-pointer rounded-md"
                        xmlns="http://www/w3/org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                        class="{darkMode ? 'block' : 'hidden'} h-4 w-4 cursor-pointer rounded-md"
                        xmlns="http://www/w3/org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <!-- Hamburger -->
            <div class="-mr-2 flex items-center sm:hidden">
                <button
                    on:click={toggleOpen}
                    class="inline-flex items-center justify-center rounded-md p-2 hover:text-primary-700 transition focus:bg-primary-700 focus:text-primary-50 focus:outline-none"
                >
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path class={open ? 'hidden': 'inline-flex'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        <path class={open ? 'inline-flex': 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <!-- Responsive Navigation Menu -->
    <div class="{open ? 'block': 'hidden'} sm:hidden">
        <div class="space-y-1 pt-2 pb-4">
            <button on:click={toggleDark}>
                <svg
                    class="{darkMode ? 'hidden' : 'block'} ml-3 h-8 w-8 cursor-pointer rounded-md fill-current p-2"
                    xmlns="http://www/w3/org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg
                    class="{darkMode ? 'block' : 'hidden'} ml-3 h-8 w-8 cursor-pointer rounded-md fill-current p-2"
                    xmlns="http://www/w3/org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                </svg>
            </button>
            {#each navLinks as link}
                <a
                    href={link.url}
                    class="block pl-6 pr-4 py-2 text-base font-medium transition"
                >
                    {link.name}
                </a>
            {/each}
        </div>
    </div>
</nav>

<style>
    .dropdown {
        @apply inline-block relative h-full px-1 pt-1 font-bold text-base leading-5 transform w-full;
    }

    .dropdown span::after {
        content: "\25BC";
        padding-left: 0.5rem;
    }

    .dropdown:hover span::after {
        content: "\25B2";
        padding-left: 0.5rem;
    }

    .dropdown:hover .dropdown-content {
        @apply visible opacity-100;
    }
    .dropdown-content {
        @apply invisible opacity-0 absolute top-full z-10 transition-all px-2 py-1;
    }
</style>