<template>
  <div :id="this.fzn._wrapId" :class="c_classWrap">
    <span><slot /></span>
    <span v-for="(char, index) in c_chars" :key="index" class="flex">{{ char }}</span>
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  const _propDefaults = {
    theme: {
      chars: {
        encoded: ["font-body"],
        decoded: ["font-body"],
      },
      wrap: ["w-full", "h-full", "flex", "flex-row", "flex-nowrap"],
    },
  };

  export default defineComponent({
    props: {
      enabled: {
        type: Boolean,
        default: true,
      },
      loop: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: "",
      },
      direction: {
        type: Number,
        default: 1, //-1:reverse, 0:random, 1:forward
      },
      scramble: {
        type: Boolean,
        default: true,
      },
      decodeSync: {
        type: Boolean,
        default: false,
      },
      startDelay: {
        type: Number,
        default: 1000,
      },
      scrambleDelay: {
        type: Number,
        default: 100,
      },
      decodeDelay: {
        type: Number,
        default: 100,
      },
      loopDelay: {
        type: Number,
        default: 3000,
      },
      decodeChars: {
        type: String,
        default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
      },
      theme: {
        type: Object,
        default: () => _propDefaults.theme,
      },
    },

    data() {
      return {
        isDecoded: false,
        fzn: Object.freeze({
          _wrapId: _.uniqueId("fx-decode-wrap-"),
        }),
        loc: {
          text: this.text,
          theme: _.merge(this.theme, _propDefaults.theme),
        },
      };
    },

    computed: {
      c_chars() {
        return this.loc.text.split("").map(function (char) {
          return char.replace(" ", "\u00A0");
        });
      },
      c_theme() {
        return this.loc.theme;
      },
      c_classCharsEncoded() {
        return _h.ensureArray(this.c_theme.chars.encoded);
      },
      c_classCharsDecoded() {
        return _h.ensureArray(this.c_theme.chars.decoded);
      },
      c_classWrap() {
        return _h.ensureArray(this.c_theme.wrap);
      },
    },

    methods: {
      async startFx() {
        this.isDecoded = false;

        let children = [...this.$el.children];
        let chars = [...this.c_chars];

        children.forEach((span) => {
          span.classList.remove(...this.c_classCharsDecoded);
          span.classList.add(...this.c_classCharsEncoded);
          span.innerText = this.decodeChars.charAt(
            Math.random() * this.decodeChars.length
          );
        });

        const scrambleText = () => {
          if (!this.isDecoded) {
            children.forEach((span) => {
              span.innerText = this.decodeChars.charAt(
                Math.random() * this.decodeChars.length
              );
            });
            setTimeout(scrambleText, this.scrambleDelay);
          }
        };

        const decodeText = () => {
          if (!this.isDecoded) {
            if (children.length) {
              let span;
              switch (this.direction) {
                case -1:
                  span = children.pop();
                  span.innerText = chars.pop();
                  break;
                case 0:
                  let i = Math.floor(Math.random() * children.length);
                  span = children.splice(i, 1).pop();
                  span.innerText = chars.splice(i, 1).shift();
                  break;
                default:
                  span = children.shift();
                  span.innerText = chars.shift();
              }
              span.classList.remove(...this.c_classCharsEncoded);
              span.classList.add(...this.c_classCharsDecoded);
            } else {
              this.endFx();
            }
            setTimeout(
              decodeText,
              this.decodeSync
                ? this.decodeDelay / children.length
                : this.decodeDelay
            );
          }
        };

        if (this.scramble) {
          setTimeout(scrambleText, this.scrambleDelay);
        }

        await _h.asyncDelay(this.startDelay).then(decodeText);
      },

      endFx() {
        this.isDecoded = true;
        if (this.enabled && this.loop) {
          setTimeout(this.startFx, this.loopDelay);
        }
      },
    },

    created() {
      if (!this.loc.text && this.$slots.default) {
        this.loc.text = _h.getChildrenTextContent(this.$slots.default());
      }
    },

    mounted() {
      this.$el.firstElementChild.remove();
      if (this.enabled) {
        this.startFx();
      }
    },
  });
</script>

