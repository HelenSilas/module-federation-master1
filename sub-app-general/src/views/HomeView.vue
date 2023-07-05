<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="isLoadingComponent">Loading HelloWorld.vue</div>
    <HelloWorld msg="Welcome " />33
    ccc
    <el-button>测试按钮</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import lodash from 'lodash';

const isLoadingComponent = ref(true);
const HelloWorld = defineAsyncComponent(() =>
// eslint-disable-next-line
  import('app_exposes/helloWord').finally(() => {
    console.log('finally');
    isLoadingComponent.value = false;
  }));
console.log(HelloWorld, 'helloworld', lodash.cloneDeep);
</script>
