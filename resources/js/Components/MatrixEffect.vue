<template>
  <div :id="this.fzn._wrapId" :class="c_classWrap">
    <canvas />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  const _propDefaults = {
    theme: {
      wrap: ["bg-center", "bg-cover", "absolute", "inset-0", "bg-black"],
    },
  };

  export default defineComponent({
    props: {
      enabled: {
        type: Boolean,
        default: true
      },
      delay: {
        type: Number,
        default: 50
      },
      colWidth: {
        type: Number,
        default: 20
      },
      charHeight: {
        type: Number,
        default: 20
      },
      font: {
        type: String,
        default: "10pt sans-serif"
      },
      getBackgroundStyle: {
        type: Function,
        default() { return "#000"; }
      },
      getFillStyle: {
        type: Function,
        default() { return "#0001" }
      },
      getCharStyle: {
        type: Function,
        default() { return "#04d900"; }
      },
      availChars: {
        type: String,
        default: '!\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
      },
      theme: {
        type: Object,
        default: () => _propDefaults.theme,
      },
    },

    data() {
      return {
        isRunning: false,
        columns: 0,
        positions: [],
        width: 0,
        height: 0,
        fzn: Object.freeze({
          _wrapId: _.uniqueId("fx-matrix-wrap-"),
        }),
        loc: {
          theme: _.merge(_propDefaults.theme, this.theme),
        },
      }
    },

    computed: {
      c_theme() {
        return this.loc.theme;
      },
      c_classWrap() {
        return _h.ensureArray(this.c_theme.wrap);
      }
    },

    methods: {
      async startFx() {
        if ( ! this.isRunning ) {
          this.isRunning = true;

          window.removeEventListener('resize', this.resize);
          window.addEventListener('resize', this.resize);

          const wrap = this.$el;
          const canvas = wrap.firstChild;
          const ctx = canvas.getContext('2d');

          this.width = canvas.width = wrap.offsetWidth;
          this.height = canvas.height = wrap.offsetHeight;

          this.columns = Math.floor(this.width / this.colWidth) + 1;

          this.positions = Array.from({length: this.columns}, () => Math.floor(Math.random() * 100));

          ctx.fillStyle = this.getBackgroundStyle();
          ctx.fillRect(0, 0, this.width, this.height);

          const runMatrix = () => {
            if (this.isRunning) {

              ctx.fillStyle = this.getFillStyle();

              ctx.fillRect(0, 0, this.width, this.height);

              ctx.fillStyle = this.getCharStyle();
              ctx.font = this.font;

              this.positions.forEach((y, ind) => {
                let text = this.availChars.charAt(Math.random() * this.availChars.length);
                let x = ind * this.colWidth;
                ctx.fillText(text, x, y);
                if (y > this.height / 2 + Math.random() * 10000) {
                  this.positions[ind] = 0;
                } else {
                  this.positions[ind] = y + this.charHeight;
                }
              });

              setTimeout(runMatrix, this.delay);
            } else {
              this.endFx();
            }
          };

          setTimeout(runMatrix, this.delay);
        }
      },

      endFx() {
        this.isRunning = false;
        this.$el.removeEventListener('resize', this.resize);
      },

      resize() {
        const wrap = this.$el;
        const canvas = wrap.firstChild;

        if (wrap.offsetWidth > this.width) {
          this.width = canvas.width = wrap.offsetWidth;
          let cols = Math.floor(this.width / this.colWidth) + 1;
          this.positions.push(...Array.from({length: cols - this.columns}, () => Math.floor(Math.random() * 100)));
          this.columns = cols;
        }

        this.height = canvas.height = wrap.offsetHeight;
      }
    },

    mounted() {
      if (this.enabled) {
        this.startFx();
      }
    },
  });
</script>