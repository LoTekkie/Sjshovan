require('./bootstrap');

import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import AppLayout from "@/Layouts/AppLayout";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        let page = require(`./Pages/${name}.vue`).default;
        if (page.layout === undefined) {
            page.layout = AppLayout;
        }
        return page;
    },
    setup({ el, app, props, plugin }) {
        window.$app = createApp({ render: () => h(app, props) })
            .use(plugin)
            .component("Link", Link)
            .component("Head", Head)
            .mixin({ methods: { route } })
            .mount(el);
        return window.$app;
    }
});

InertiaProgress.init({ color: '#ded044' });
