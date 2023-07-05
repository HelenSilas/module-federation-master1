import {
  ISitemap, ISitemapItem, IBreadcrumbItem, IBreadcrumb
} from '@/types'
import { replaceRouteSolidus } from '@/utils'

const sitemapUrl = process.env.NODE_ENV === 'production' ? '/main/sitemap.json' : '/sitemap.json'
export async function resolveSitemap () {
  const sitemap = await window.fetch(sitemapUrl).then((res) => res.json())
  return sitemap
}

export async function genNormalizeSiteMapNodes (sitemap: ISitemap) {
  const nodeMap: { [key: string]: IBreadcrumbItem } = {}

  sitemap.forEach(findBottomNode)

  bottomNodes.forEach((node: IBreadcrumbItem) => {
    const path = node.selectRule?.path as string
    nodeMap[replaceRouteSolidus(path)] = node
  })

  return nodeMap
}

/**
 * 底层节点
 * 最底层菜单节点 自身和下钻页面 平铺
 */
const bottomNodes: IBreadcrumb = []

/**
 * 底层节点，赋值parent数据
 */
function findBottomNode (sitemapItem: ISitemapItem) {
  const stack = [sitemapItem]

  while (stack.length) {
    const node = stack.pop() as ISitemapItem
    if (hasChildren(node)) {
      node.children.forEach((child: IBreadcrumbItem) => {
        child.parent = {
          ...node,
          children: []
        }
        if (hasChildren(child)) {
          if (child.childrenIsDrillPage) {
            bottomNodes.push(child)
          }
          stack.push(child)
        } else {
          bottomNodes.push({
            ...child,
            isDrillPage: child.parent.childrenIsDrillPage
          })
        }
      })
    }
  }
}

function hasChildren (node: ISitemapItem) {
  return Array.isArray(node.children) && node.children.length
}
