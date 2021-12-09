<template>

</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      someProp: {
        type: String,
        default: "Hello"
      }
    },
    data() {
      return {
        local: {
          someProp: this.someProp
        }
      }
    },
    beforeMount() {
      this.local.someProp = "Hello, World!";
      console.log(this.local.someProp);
      console.log(this.someProp);
      console.log(this.someProp = "Oh, no!")
    }
  });
</script>

