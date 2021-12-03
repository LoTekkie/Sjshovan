<template>
    <div class="flex items-center md:justify-start justify-center text-gray-400" :class="classWrap">
        <label for="toggleButton" class="flex">
            <span :class="classLabel" v-if="!this.theme.labelRight && this.theme.labelVisible">
                <slot>{{ this.isToggled ? this.theme.on.labelText : this.theme.off.labelText }}</slot>
            </span>
            <div class="relative cursor-pointer">
                <input id="toggleButton" type="checkbox" class="hidden" @click="toggle" />
                <div class="transition-colors duration-700 ease-in-out w-9 h-5 rounded-full shadow-inner"
                    :class="classPanel">
                </div>
                <div class="top-0.5 left-0.5 transition-all duration-300 ease-in-out absolute w-4 h-4 bg-white rounded-full shadow inset-y-0 left-0"
                    :class="classSwitch">
                </div>
            </div>
            <span :class="classLabel" v-if="this.theme.labelRight && this.theme.labelVisible">
                <slot>{{ this.isToggled ? this.theme.on.labelText : this.theme.off.labelText }}</slot>
            </span>
        </label>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            options: {
                type: [Object],
                default: {} //see defaultOptions
            }
        },
        data() {
            return {
                isToggled: false,
                defaultOptions: {
                    theme: {
                        panel: [],
                        switch: [],
                        label: [],
                        wrap: [],
                        on: {
                            panel: ["bg-green-300"],
                            switch: [],
                            label: [],
                            labelText: "On"
                        },
                        off: {
                            panel: ["bg-gray-200"],
                            switch: [],
                            label: [],
                            labelText: "Off"
                        },
                        labelVisible: true,
                        labelRight: false
                    },
                    callbacks: {
                        onClick: (component) => {},
                        onBeforeMount: (component) => {}
                    },
                }
            }
        },
        computed: {
            mergedOptions() {
                return window._.merge(this.defaultOptions, this.options)
            },
            theme() {
                return this.mergedOptions.theme
            },
            classPanel() {
                return this.resolveThemeClass("panel");
            },
            classSwitch() {
                let arr = this.resolveThemeClass("switch");
                return this.isToggled ? window._.union(arr, ["transform", "translate-x-4"]) : arr
            },
            classLabel() {
                return this.resolveThemeClass("label");
            },
            classWrap() {
                return this.ensureArray(this.theme.wrap)
            }
        },
        methods: {
            toggle() {
                this.isToggled = !this.isToggled;
                this.options.callbacks.onClick(this)
            },
            ensureArray(object) {
                return Array.isArray(object) ? object : []
            },
            resolveThemeClass(context) {
                let arr = this.isToggled ?
                    this.ensureArray(this.theme.on[context])
                    :
                    this.ensureArray(this.theme.off[context]);
                return window._.union(arr, this.ensureArray(this.theme[context]))
            }
        },
        beforeMount() {
            this.options.callbacks.onBeforeMount(this)
        }
    });
</script>
