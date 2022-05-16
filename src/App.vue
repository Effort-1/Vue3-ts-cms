<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Login from "@/views/login/login.vue";
export default defineComponent({
  components: {
    Login,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
#app {
  height: 100%;
}
</style>
