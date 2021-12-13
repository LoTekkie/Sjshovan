require('./bootstrap');

import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import VueParticles from 'vue-particles'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faChevronCircleUp, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AppLayout from "@/Layouts/AppLayout";

library.add(faHome, faChevronCircleUp, faArrowCircleUp);

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
    let $app = createApp({ render: () => h(app, props) })
      .use(plugin)
      .use(VueParticles)
      .component('font-awesome-icon', FontAwesomeIcon)
      .component("Link", Link)
      .component("Head", Head)
      .mixin({ methods: { route } })
      .provide('lodash', window._);
      //custom globals
      $app.config.globalProperties.$_ = window._;
      window.$app = $app.mount(el);
      return window.$app;
    }
});

InertiaProgress.init({ color: '#ded044' });
