<template> <!-- Static -->
    <jet-banner />
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <!-- Page Header -->
        <header>
            <nav class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-400 transition-colors duration-700 ease-in-out" v-if="$page.props.user">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex-shrink-0 flex items-center">
                                <Link :href="route('admin.dashboard')">
                                    <jet-application-mark class="block h-9 w-auto" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <jet-nav-link :href="route('admin.dashboard')" :active="route().current('dashboard')">
                                    Dashboard
                                </jet-nav-link>

                                <jet-nav-link :href="route('admin.workbench')" :active="route().current('admin.workbench')" v-if="$page.props.appEnv === 'local'">
                                    Workbench
                                </jet-nav-link>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ml-6">
                            <div class="ml-3 relative">
                                <!-- Teams Dropdown -->
                                <jet-dropdown align="right" width="60" v-if="$page.props.jetstream.hasTeamFeatures">
                                    <template #trigger>
                                    <span class="inline-flex rounded-md">
                                        <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition">
                                            {{ $page.props.user.current_team.name }}

                                            <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                    </template>

                                    <template #content>
                                        <div class="w-60">
                                            <!-- Team Management -->
                                            <template v-if="$page.props.jetstream.hasTeamFeatures">
                                                <div class="block px-4 py-2 text-xs text-gray-400">
                                                    Manage Team
                                                </div>

                                                <!-- Team Settings -->
                                                <jet-dropdown-link :href="route('teams.show', $page.props.user.current_team)">
                                                    Team Settings
                                                </jet-dropdown-link>

                                                <jet-dropdown-link :href="route('teams.create')" v-if="$page.props.jetstream.canCreateTeams">
                                                    Create New Team
                                                </jet-dropdown-link>

                                                <div class="border-t border-gray-100"></div>

                                                <!-- Team Switcher -->
                                                <div class="block px-4 py-2 text-xs text-gray-400">
                                                    Switch Teams
                                                </div>

                                                <template v-for="team in $page.props.user.all_teams" :key="team.id">
                                                    <form @submit.prevent="switchToTeam(team)">
                                                        <jet-dropdown-link as="button">
                                                            <div class="flex items-center">
                                                                <svg v-if="team.id == $page.props.user.current_team_id" class="mr-2 h-5 w-5 text-green-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                <div>{{ team.name }}</div>
                                                            </div>
                                                        </jet-dropdown-link>
                                                    </form>
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                </jet-dropdown>
                            </div>

                            <!-- Settings Dropdown -->
                            <div class="ml-3 relative">
                                <jet-dropdown align="right" width="48">
                                    <template #trigger>
                                        <button v-if="$page.props.jetstream.managesProfilePhotos" class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                            <img class="h-8 w-8 rounded-full object-cover" :src="$page.props.user.profile_photo_url" :alt="$page.props.user.name" />
                                        </button>

                                        <span v-else class="inline-flex rounded-md">
                                        <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
                                            {{ $page.props.user.name }}

                                            <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                    </template>

                                    <template #content>
                                        <!-- Account Management -->
                                        <div class="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>

                                        <jet-dropdown-link :href="route('profile.show')">
                                            Profile
                                        </jet-dropdown-link>

                                        <jet-dropdown-link :href="route('api-tokens.index')" v-if="$page.props.jetstream.hasApiFeatures">
                                            API Tokens
                                        </jet-dropdown-link>

                                        <div class="border-t border-gray-100"></div>

                                        <!-- Authentication -->
                                        <form @submit.prevent="logout">
                                            <jet-dropdown-link as="button">
                                                Log Out
                                            </jet-dropdown-link>
                                        </form>
                                    </template>
                                </jet-dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-mr-2 flex items-center sm:hidden">
                            <button @click="showingNavigationDropdown = ! showingNavigationDropdown" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}" class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <jet-responsive-nav-link :href="route('admin.dashboard')" :active="route().current('dashboard')">
                            Dashboard
                        </jet-responsive-nav-link>
                        <jet-responsive-nav-link :href="route('admin.workbench')" :active="route().current('admin.workbench')" v-if="$page.props.appEnv === 'local'">
                            Workbench
                        </jet-responsive-nav-link>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="flex items-center px-4">
                            <div v-if="$page.props.jetstream.managesProfilePhotos" class="flex-shrink-0 mr-3" >
                                <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.user.profile_photo_url" :alt="$page.props.user.name" />
                            </div>

                            <div>
                                <div class="font-medium text-base text-gray-800">{{ $page.props.user.name }}</div>
                                <div class="font-medium text-sm text-gray-500">{{ $page.props.user.email }}</div>
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <jet-responsive-nav-link :href="route('profile.show')" :active="route().current('profile.show')">
                                Profile
                            </jet-responsive-nav-link>

                            <jet-responsive-nav-link :href="route('api-tokens.index')" :active="route().current('api-tokens.index')" v-if="$page.props.jetstream.hasApiFeatures">
                                API Tokens
                            </jet-responsive-nav-link>

                            <!-- Authentication -->
                            <form method="POST" @submit.prevent="logout">
                                <jet-responsive-nav-link as="button">
                                    Log Out
                                </jet-responsive-nav-link>
                            </form>

                            <!-- Team Management -->
                            <template v-if="$page.props.jetstream.hasTeamFeatures">
                                <div class="border-t border-gray-200"></div>

                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Manage Team
                                </div>

                                <!-- Team Settings -->
                                <jet-responsive-nav-link :href="route('teams.show', $page.props.user.current_team)" :active="route().current('teams.show')">
                                    Team Settings
                                </jet-responsive-nav-link>

                                <jet-responsive-nav-link :href="route('teams.create')" :active="route().current('teams.create')" v-if="$page.props.jetstream.canCreateTeams">
                                    Create New Team
                                </jet-responsive-nav-link>

                                <div class="border-t border-gray-200"></div>

                                <!-- Team Switcher -->
                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Switch Teams
                                </div>

                                <template v-for="team in $page.props.user.all_teams" :key="team.id">
                                    <form @submit.prevent="switchToTeam(team)">
                                        <jet-responsive-nav-link as="button">
                                            <div class="flex items-center">
                                                <svg v-if="team.id == $page.props.user.current_team_id" class="mr-2 h-5 w-5 text-green-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <div>{{ team.name }}</div>
                                            </div>
                                        </jet-responsive-nav-link>
                                    </form>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Page Content -->
        <main>
            <slot></slot>
        </main>

        <!-- Page Footer -->
        <footer class="text-gray-600 body-font bg-white dark:bg-gray-800  transition-colors duration-700 ease-in-out">
            <div id="footer-links">
                <div
                class="
                container
                px-5
                py-24
                mx-auto
                flex
                md:items-center
                lg:items-start
                md:flex-row md:flex-nowrap
                flex-wrap flex-col
                justify-center
                "
                >
                <div
                class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left"
                >
                <a
                href=""
                class="
                flex
                title-font
                font-medium
                items-center
                md:justify-start
                justify-center
                text-gray-900
                "
                >
                <i class="fas fa-cubes fa-lg text-purple-500"></i>
                <span class="ml-3 text-xl dark:text-white underline">Site Theme</span>
                </a>
                <toggle-button
                    :options="btnToggleTheme.options"
                ></toggle-button>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                </p>
                </div>
                <div
                class="
                flex-grow flex flex-wrap
                md:pl-20
                -mb-10
                md:mt-0
                mt-10
                md:text-left
                text-center
                "
                >
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2
                class="
                title-font
                font-medium
                text-gray-900
                tracking-widest
                text-sm
                mb-3
                dark:text-white
                "
                >
                CATEGORIES
                </h2>
                <nav class="list-none mb-10">
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >First Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Second Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Third Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Fourth Link</a
                >
                </li>
                </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2
                class="
                title-font
                font-medium
                text-gray-900
                tracking-widest
                text-sm
                mb-3
                dark:text-white
                "
                >
                CATEGORIES
                </h2>
                <nav class="list-none mb-10">
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >First Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Second Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Third Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Fourth Link</a
                >
                </li>
                </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2
                class="
                title-font
                font-medium
                text-gray-900
                tracking-widest
                text-sm
                mb-3
                dark:text-white
                "
                >
                CATEGORIES
                </h2>
                <nav class="list-none mb-10">
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >First Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Second Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Third Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Fourth Link</a
                >
                </li>
                </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2
                class="
                title-font
                font-medium
                text-gray-900
                tracking-widest
                text-sm
                mb-3
                dark:text-white
                "
                >
                CATEGORIES
                </h2>
                <nav class="list-none mb-10">
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >First Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Second Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Third Link</a
                >
                </li>
                <li>
                <a href="" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 underline"
                >Fourth Link</a
                >
                </li>
                </nav>
                </div>
                </div>
                </div>
            </div>
            <div id="footer-copyright">
                <div class="bg-white dark:bg-gray-900 transition-colors duration-700 ease-in-out">
                <div
                class="
                container
                mx-auto
                py-4
                px-5
                flex flex-wrap flex-col
                sm:flex-row
                "
                >
                <p class="text-gray-500 text-sm text-center sm:text-left">
                © 2021 Copyright:
                <a
                href="https://www.tailwind-elements.com/"
                class="text-gray-600 ml-1 underline"
                target="_blank"
                >Tailwind Elements</a
                >
                </p>
                <span
                class="
                inline-flex
                sm:ml-auto sm:mt-0
                mt-2
                justify-center
                sm:justify-start
                "
                >
                <a href="" class="text-gray-500">
                <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="ml-3 text-gray-500">
                <i class="fab fa-twitter"></i>
                </a>
                <a href="" class="ml-3 text-gray-500">
                <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="" class="ml-3 text-gray-500">
                <i class="fab fa-youtube"></i>
                </a>
                <a href="" class="ml-3 text-gray-500">
                <i class="fab fa-instagram"></i>
                </a>
                </span>
                </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import JetApplicationMark from '@/Jetstream/ApplicationMark.vue'
    import JetBanner from '@/Jetstream/Banner.vue'
    import JetDropdown from '@/Jetstream/Dropdown.vue'
    import JetDropdownLink from '@/Jetstream/DropdownLink.vue'
    import JetNavLink from '@/Jetstream/NavLink.vue'
    import ToggleButton from "@/Components/ToggleButton";
    import JetResponsiveNavLink from '@/Jetstream/ResponsiveNavLink.vue'

    export default defineComponent({
        components: {
            JetApplicationMark,
            JetBanner,
            JetDropdown,
            JetDropdownLink,
            JetNavLink,
            JetResponsiveNavLink,
            ToggleButton
        },

        data() {
            return {
                showingNavigationDropdown: false,
                btnToggleTheme: {
                    options: {
                        theme: {
                            on: {
                                labelText: "Theme: Dark",
                                panel: ["bg-indigo-500"]
                            },
                            off: {
                                labelText: "Theme: Light",
                                label: ["text-gray-800"]
                            },
                            panel: ["ml-3", "mr-3"],
                            switch: ["ml-3"],
                            wrap: ["mt-3"],
                            label: [""],
                            labelRight: true
                        },
                        callbacks: {
                            onClick: this.toggleTheme,
                            onBeforeMount: this.setTheme
                        }
                    }
                }
            }
        },
        methods: {
            switchToTeam(team) {
                this.$inertia.put(route('current-team.update'), {
                    'team_id': team.id
                }, {
                    preserveState: false
                })
            },
            logout() {
                this.$inertia.post(route('logout'));
            },
            toggleTheme(component) {
                if (window.localStorage.theme === 'dark') {
                    window.localStorage.theme = "light";
                    document.documentElement.classList.remove('dark');
                } else {
                    window.localStorage.theme = "dark";
                    document.documentElement.classList.add('dark');
                }
            },
            setTheme(component) {
                component.isToggled = window.localStorage.theme === 'dark';
            }
        }
    })
</script>
