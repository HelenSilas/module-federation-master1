import { ISitemapItem } from './index'

export interface IBreadcrumbItem extends ISitemapItem {
  /**
   * 父级节点，不含children属性
   */
  parent?: IBreadcrumbItem
}

export type IBreadcrumb = IBreadcrumbItem[]

export type INormalizeSiteMapNodes = { [key: string]: IBreadcrumbItem }
