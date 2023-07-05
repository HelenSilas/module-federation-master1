<template>
  <div class="ch-layout__breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, Ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { IBreadcrumbItem } from '@/types'
import useStore from '@/store'
import { startWithNode, replaceRouteSolidus } from '@/utils'

const store = useStore()

const route = useRouter().currentRoute

const breadCrumbList: Ref<string[]> = ref([])

watch(
  () => route.value.path,
  (val: string) => {
    const routePath = replaceRouteSolidus(val)
    const currentNode = store.normalizeMenuNodes?.[routePath] ||
      startWithNode(store.normalizeMenuNodes, routePath)
    if (currentNode) {
      setBreadcrumbData(currentNode)
    }
  },
  { immediate: true }
)

function setBreadcrumbData (currentNode: IBreadcrumbItem): void {
  breadCrumbList.value = findParentTitle(currentNode).concat(currentNode.title)
}

function findParentTitle (node: IBreadcrumbItem): string[] {
  const titles: string[] = []
  let { parent } = node
  while (parent) {
    titles.push(parent.title)
    parent = parent.parent
  }
  return titles.reverse()
}
</script>

<style lang="scss" scoped>
.ch-layout__breadcrumb {
  overflow: hidden;
  padding: 8px 16px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  font-size: 12px;

  :deep(.el-breadcrumb__item) {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
