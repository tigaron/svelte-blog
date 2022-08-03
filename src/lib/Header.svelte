<script>
    export let title;
    export let type;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="Four Leaves Studio - {title}">
</svelte:head>

<header class="mx-auto max-w-3xl py-6 px-6 sm:px-6 xl:max-w-5xl xl:px-0">
    {#if type === "post"}
        <div class="text-center">
            <h1 class="text-3xl font-semibold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md-leading-14">{title}</h1>
        </div>
    {:else if type === "blog"}
        <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8 pt-6">
            <div>
                <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight md:text-4xl md:leading-10 lg:text-6xl lg:leading-14">Hi, I'm Nike <span class="text-primary-500">Suputra</span></h1>
                <h2 class="text-lg">Welcome to my blog! - Thoughts from a wandering mind. I am a software engineer by profession and an urban planner by training. In my free time, I like developing <a class="text-primary-500" href="/project">side-projects</a> and reading <a class="text-primary-500" href="/novel">novels</a>. Have a good read!</h2>
            </div>
            <div class="flex items-center justify-center mx-auto">
                <div class="p-6 bg-gray-200 dark:bg-gray-800 w-full h-full max-w-sm rounded-md">
                    <p class="pb-1 text-lg font-semibold text-center">Stay updated and receive latest post straight to your mailbox!</p>
                    <form action="" class="flex flex-col mt-2">
                        <label for="email-input" class="sr-only">Email address</label>
                        <input
                            class="py-2 px-4 w-full rounded-md dark:bg-black focus:outline-none focus:ring-2 focus:border-transparent focus:ring-primary-600"
                            id="email-input"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                            disabled
                        >
                        <button
                            class="py-2 px-4 mt-2 shadow-sm w-full bg-primary-500 rounded-md font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black"
                            type="submit"
                            disabled
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    {:else}
        <div>
            <h1 class="md:leading-14 text-4xl font-black leading-10 tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">{title}</h1>
        </div>
    {/if}
</header>