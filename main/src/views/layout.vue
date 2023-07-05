<template>
  <div class="ch-layout layout-hybrid" id="container">
    <header class="ch-layout__header">
      <div class="ch-layout__logo">
        <header-logo />
      </div>
      <div class="ch-layout__menu">
        <header-menu :menuNodes="sitemap" @change="changeHeader" />
      </div>
      <div class="ch-layout__toolbar">
        <header-toolbar />
      </div>
    </header>
    <aside
      class="ch-layout__aside"
      :class="{
        collapsed: isCollapsed
      }"
      v-if="asideData.length"
    >
      <aside-menu :asideMenu="asideData" @onFold="onFold" />
    </aside>
    <main
      class="ch-layout__main has-breadcrumb has-header has-aside"
      :class="{
        collapsed: isCollapsed
      }"
    >
      <div class="ch-layout__breadcrumb-wrapper" v-if="asideData.length">
        <bread-crumb />
      </div>
      <div
        class="ch-layout__microapp-wrapper"
        v-loading="isLoading"
        element-loading-text="应用加载中..."
      >
        <div id="container"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import AsideMenu from '@/components/home/aside-menu.vue'
import BreadCrumb from '@/components/home/bread-crumb.vue'
import HeaderLogo from '@/components/home/header-logo.vue'
import HeaderMenu from '@/components/home/header-menu.vue'
import HeaderToolbar from '@/components/home/header-toolbar.vue'
import { resolveSitemap, genNormalizeSiteMapNodes } from '@/composables'
import { ISitemapItem, ISitemap } from '@/types'
import useStore from '@/store'

const store = useStore()

const sitemap = ref([])

const asideData: Ref<ISitemap> = ref([])

function changeHeader (value: ISitemapItem) {
  asideData.value = value.children || []
}

const isCollapsed = ref(false)

function onFold (value: boolean) {
  isCollapsed.value = value
}

const isLoading = ref(false)

onMounted(async () => {
  console.log('onMounted');

  sitemap.value = await resolveSitemap()
  store.normalizeMenuNodes = await genNormalizeSiteMapNodes(sitemap.value)

  window.addEventListener('micro-app-loaded', (event: any) => {
    isLoading.value = event.detail.loading
  })
})
</script>

<style lang="scss">
#app {
  height: 100%;
  overflow: hidden;
  background: #f2f2f2;

  .ch-layout {
    &__header {
      height: 56px;
      background: linear-gradient(90deg, #192873 0%, #1d3095 40%, #409eff 100%);

      .ch-layout__logo {
        width: 216px;
        height: 56px;
        padding: 2px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        overflow: hidden;
        box-sizing: border-box;
        color: #fff;
      }

      .ch-layout__menu {
        height: 100%;
        flex: 1;
        overflow: hidden;
      }
    }

    &__aside {
      position: absolute;
      left: 0;
      top: 56px;
      bottom: 0;
      width: 216px;
      background: linear-gradient(
        180deg,
        #192873 0%,
        #1d3095 66%,
        #409eff 100%
      );

      &.collapsed {
        width: 74px;
      }
    }

    &__main {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }

    &__main.has-header {
      top: 56px;
    }

    &__main.has-breadcrumb {
      .ch-layout__breadcrumb-wrapper {
        background-color: #ffffff;
      }

      .ch-layout__microapp-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 16px;
        font-size: 14px;
        overflow-y: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    &__main.has-aside {
      left: 216px;

      &.collapsed {
        left: 74px;
      }
    }

    #container,
    #container > div {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
}
</style>
