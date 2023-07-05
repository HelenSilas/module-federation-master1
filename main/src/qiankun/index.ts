import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'

const microAppLoaded = new CustomEvent('micro-app-loaded', {
  detail: {
    loading: false
  }
})

const triggerMicroEvent = (loading: boolean) => {
  microAppLoaded.detail.loading = loading
  window.dispatchEvent(microAppLoaded)
  return Promise.resolve()
}

const microAppsRoute = [
  {
    name: 'sub-app-general',
    entry: '//localhost:5551/sub-app-general/',
    container: '#container',
    activeRule: '/sub-app-general',
    props: {}
  },
  {
    name: 'sub-app-exposes',
    entry: '//localhost:5552/',
    container: '#container',
    activeRule: '/exposes'
  }
]

registerMicroApps(microAppsRoute, {
  beforeLoad: () => triggerMicroEvent(true),
  afterMount: () => triggerMicroEvent(false)
})
setDefaultMountApp('sub-app-general');

start({ singular: false })

export { microAppsRoute }
