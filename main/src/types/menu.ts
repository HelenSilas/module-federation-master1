export interface ISitemapItem {
  /**
   * 菜单唯一标识
   */
  key: string

  /**
   * 菜单标题
   */
  title: string

  /**
   * 菜单图标
   */
  icon: string

  /**
   * 是否默认打开，仅查配置项的第一个
   */
  defaultOpen: boolean

  /**
   * 是否下钻页
   */
  isDrillPage?: boolean

  /**
   * children 是否下钻页
   */
  childrenIsDrillPage?: boolean

  /**
   * 打开规则
   */
  selectRule: {
    /**
     * target 为 _blank 时，打开新窗口，跳转到 href
     */
    href?: string

    /**
     * target 为 _self 时，内部跳转到 path
     */
    path?: string

    /**
     * 打开方式
     */
    target: '_blank' | '_self'
  }

  /**
   * 子菜单
   */
  children: ISitemapItem[]
}

export type ISitemap = ISitemapItem[]

export enum TargetType {
  Blank = '_blank',
  Self = '_self'
}
