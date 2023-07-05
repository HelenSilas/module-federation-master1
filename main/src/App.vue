<template>
  <!-- <Layout v-if="isMicroApp" class="app" /> -->
  <!-- <router-view></router-view> -->
  <div id="app">
    <span @click="go('/sub-app-general')">general</span>
    <span @click="go('/exposes')">expose</span>
    <div id="container">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { microAppsRoute } from "@/qiankun";
import Layout from "./views/layout.vue";

const route = useRoute();
const isMicroApp = computed(() =>
  microAppsRoute.some((microApp) => route.path.startsWith(microApp.activeRule))
);
const router = useRouter();
const go = (url) => {
  router.push(url)
}
console.log(isMicroApp);
</script>
