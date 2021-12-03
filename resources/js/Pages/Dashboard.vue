<template>
    <page-layout title="Dashboard">
        <div class="flex py-12 justify-center items-center">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <welcome />
                </div>
            </div>
        </div>
    </page-layout>
</template>

<script>
    import { defineComponent } from 'vue'
    import Welcome from '@/Jetstream/Welcome.vue'
    import PageLayout from "@/Layouts/PageLayout";

    export default defineComponent({
        components: {
            PageLayout,
            Welcome,
        },

        data() {
            return {

            }
        }
    })
</script>
