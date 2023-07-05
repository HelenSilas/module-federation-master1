<template>
  <el-scrollbar wrap-style="overflow-x: hidden;" class="el-scrollbar-bg">
    <el-menu
      :default-active="defaultActive"
      text-color="rgba(255, 255, 255 ,0.65)"
      active-text-color="rgba(255, 255, 255)"
      background-color="none"
      hover-background="#e3e3e3"
      :collapse="isCollapsed"
      :collapse-transition="false"
    >
      <renderMenu />
    </el-menu>
  </el-scrollbar>

  <!-- 展开折叠侧边菜单 -->
  <div class="fold-wrapper">
    <el-icon @click="handleOnFold">
      <Fold v-show="!isCollapsed" />
      <Expand v-show="isCollapsed" />
    </el-icon>
  </div>
</template>

<script setup lang="tsx">
import { ref, PropType, watch, defineEmits, defineProps } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { IBreadcrumbItem, ISitemap, ISitemapItem } from '@/types'
import useStore from '@/store'
import { startWithNode, replaceRouteSolidus } from '@/utils'
import { useHandleMenu } from '@/composables'

const store = useStore()

const emit = defineEmits(['onFold'])

const props = defineProps({
  // 侧边菜单
  asideMenu: {
    type: Array as PropType<ISitemap>,
    default: () => []
  }
})

const router = useRouter()
const route = router.currentRoute

const { handleMenuClick } = useHandleMenu(route, null, router)

/**
 * 默认选中的菜单
 */
const defaultActive = ref('')

watch(
  () => route.value.path,
  (path: string) => {
    const routePath = replaceRouteSolidus(path)
    const asideNode = store.normalizeMenuNodes?.[routePath] ||
      startWithNode(store.normalizeMenuNodes, routePath)

    if (asideNode) {
      defaultActive.value = hightLightMenu(asideNode)
    }
  },
  { immediate: true }
)

function hightLightMenu (asideNode: IBreadcrumbItem): string {
  let node: IBreadcrumbItem = asideNode
  while (node.isDrillPage) {
    node = node.parent as IBreadcrumbItem
  }
  return node.key
}

/**
 * 渲染最后一级菜单
 * @param menuNode 菜单节点
 */
function renderBottomMenu (menuNode: ISitemapItem) {
  return menuNode.children.map((item: ISitemapItem) => (
      <el-menu-item index={item.key} onClick={() => handleMenuClick(item)}>
        <i class="menu-item-leaf" />
        {item.title}
      </el-menu-item>
  ))
}

/**
 * 渲染子菜单
 * @param menuNode 菜单节点
 */
function renderSubMenu (menuNode: ISitemapItem) {
  return (
    <el-sub-menu
      index={menuNode.key}
      popper-class="ch-menu--vertical"
      v-slots={{
        title: () => (
          <>
            {renderIcon(menuNode)}
            <span>{menuNode.title}</span>
          </>
        )
      }}
    >
      {renderBottomMenu(menuNode)}
    </el-sub-menu>
  )
}

/**
 * 渲染普通菜单
 * @param menuNode 菜单节点
 */
function renderMenuItem (menuNode: ISitemapItem) {
  return (
    <el-menu-item
      index={menuNode.key}
      v-slots={{
        default: () => <>{renderIcon(menuNode)}</>,
        title: () => <>{menuNode.title}</>
      }}
      onClick={() => handleMenuClick(menuNode)}
    ></el-menu-item>
  )
}

/**
 * 渲染菜单图标
 */
function renderIcon (menuNode: ISitemapItem) {
  const { icon } = menuNode
  if (!icon) return null
  return <i class={`main-app-iconfont ${icon}`} />
}

/**
 * 渲染菜单
 */
function renderMenu () {
  return props.asideMenu.map((item: ISitemapItem) => {
    if (item.children?.length && !item.childrenIsDrillPage) {
      return renderSubMenu(item)
    }
    return renderMenuItem(item)
  })
}

const isCollapsed = ref(false)

function handleOnFold () {
  isCollapsed.value = !isCollapsed.value
  emit('onFold', isCollapsed.value)
}
</script>

<style lang="scss" scoped>
.el-scrollbar-bg {
  background-image: url('@/assets/images/menu/aside-bg.png');
  background-repeat: no-repeat;
  background-size: 216px 334px;
  background-position: 0 100%;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  color: #fff !important;
  background-color: transparent !important;
}

:deep(.el-menu-item) {
  height: 40px !important;
  line-height: 40px !important;

  &.is-active {
    background-image: linear-gradient(90deg, #409eff 0%, #79bbff 100%);
    border-radius: 3px;
  }
}

.el-menu--vertical {
  padding: 0 8px;
  border-right: none;
}

:deep(.el-menu) .main-app-iconfont {
  margin-right: 8px;
  font-size: 16px;
}

:deep(.el-sub-menu__title) {
  height: 40px !important;
  line-height: 40px !important;
}

:deep(.menu-item-leaf) {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: currentColor;
}

.fold-wrapper {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 18px;
  line-height: 0;
  color: rgba(255, 255, 255, 0.65);

  i {
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
}
</style>
