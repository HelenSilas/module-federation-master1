import { Router } from 'vue-router'
import { ISitemapItem, TargetType } from '@/types'
import { replaceRouteSolidus } from '@/utils'

export function useHandleMenu (route: any, emit: any, router: Router) {
  /**
   * 获取第一个叶子节点
   * 当子节点为下钻页面时，返回自身，不继续向下查找
   */
  function getFirstLeaf (menuNode: ISitemapItem): ISitemapItem {
    let node: ISitemapItem = menuNode
    while (node.children) {
      const firstChild = node.children[0]
      if (firstChild?.childrenIsDrillPage) {
        return firstChild
      }
      node = firstChild
    }
    return node
  }

  /**
   * 左侧 / 顶部 菜单点击事件
   */
  function handleMenuClick (menuNode: ISitemapItem) {
    const firstLeaf = emit ? getFirstLeaf(menuNode) : menuNode
    const target = firstLeaf.selectRule?.target
    const path = firstLeaf.selectRule?.[target === '_blank' ? 'href' : 'path']

    if (!path) return

    if (path === replaceRouteSolidus(route.value.path)) return

    if (target === TargetType.Self) {
      handleSelfTargetPath(path, menuNode)
    } else if (target === TargetType.Blank) {
      window.open(path)
    }
  }

  /**
   * 路由跳转
   */
  function handleSelfTargetPath (
    path: string | undefined,
    menuNode: ISitemapItem
  ) {
    if (path && path.startsWith('/')) {
      router.push(path)
      emit && emit('change', menuNode)
    }
  }

  return {
    getFirstLeaf,
    handleMenuClick
  }
}
