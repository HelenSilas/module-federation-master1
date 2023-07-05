import { INormalizeSiteMapNodes } from '@/types'

export function startWithNode (val: INormalizeSiteMapNodes, url: string) {
  const path = Object.keys(val).find((p) => url.startsWith(p))
  return val[path ?? '/']
}
