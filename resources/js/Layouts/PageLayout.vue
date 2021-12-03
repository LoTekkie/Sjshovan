<template> <!-- Dynamic -->
    <Head :title="title"></Head>

    <div class="bg-white shadow dark:bg-gray-800 transition-colors duration-700 ease-in-out">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight dark:text-white">
                {{ title }}
            </h2>
        </div>
    </div>

    <!-- Main Content -->
    <slot></slot>
</template>

<script>
    import {defineComponent} from "vue";

    export default defineComponent({
        props: {
            title: String,
        }
    });
</script>
