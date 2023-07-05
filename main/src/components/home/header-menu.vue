<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    background-color="none"
    text-color="rgba(255, 255, 255 ,0.65)"
    active-text-color="rgba(255, 255, 255)"
  >
    <el-menu-item
      :index="item.key"
      :key="item.key"
      v-for="item in props.menuNodes"
      @click="handleMenuClick(item)"
    >
      <i
        :class="{
          'main-app-iconfont': true,
          [item.icon]: true
        }"
        v-if="item.icon"
      />
      {{ item.title }}
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {
  Ref, ref, watch, PropType, defineProps, defineEmits
} from 'vue'
import { useRouter } from 'vue-router'
import {
  ISitemap,
  ISitemapItem,
  IBaseString,
  IBreadcrumbItem,
  INormalizeSiteMapNodes
} from '@/types'
import useStore from '@/store'
import { startWithNode, replaceRouteSolidus } from '@/utils'
import { useHandleMenu } from '@/composables'

const store = useStore()

const props = defineProps({
  menuNodes: {
    type: Array as PropType<ISitemap>,
    default: () => []
  }
})

const router = useRouter()
const route = router.currentRoute

const activeMenu: Ref<IBaseString> = ref(undefined)

const emit = defineEmits(['change'])

const { getFirstLeaf, handleMenuClick } = useHandleMenu(route, emit, router)

watch(
  () => store.normalizeMenuNodes,
  (val: INormalizeSiteMapNodes) => {
    const routePath = replaceRouteSolidus(route.value.path)
    const currentNode = val[routePath] || startWithNode(val, routePath)
    if (!currentNode) {
      initialMenu()
      return
    }
    const topNode = props.menuNodes.find(
      (n) => n.key === findTopNode(currentNode).key
    )
    initialMenu(topNode)
  }
)

function initialMenu (topNode?: ISitemapItem) {
  const defaultNode = topNode || props.menuNodes.find((item) => item.defaultOpen)

  if (!defaultNode) return

  // 不识别的路由，需要跳转到默认顶级节点
  if (!topNode) {
    const { selectRule } = getFirstLeaf(defaultNode)
    router.push(selectRule.path as string)
  }

  activeMenu.value = defaultNode.key

  emit('change', defaultNode)
}

/**
 * 查找顶级节点
 */
function findTopNode (menuNode: IBreadcrumbItem): IBreadcrumbItem {
  let node = menuNode
  while (node.parent) {
    node = node.parent
  }
  return node
}
</script>

<style lang="scss" scoped>
.el-menu-item:hover {
  color: #fff !important;
  background: none !important;
}

.el-menu--horizontal {
  height: 100%;
  border-bottom: none;

  .el-menu-item {
    border-bottom: 4px solid transparent !important;

    &.is-active {
      border-color: #409eff !important;
      background: none !important;
    }

    .main-app-iconfont {
      margin-right: 8px;
      font-size: 16px;
    }
  }
}
</style>
