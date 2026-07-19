import { addons } from 'storybook/manager-api'

// 面板高度/寬度不再歸零 —— Phase 4 的 a11y 與 Phase 5 的 interaction tests
// 都需要看得到下方面板，歸零會讓使用者以為面板壞掉。
addons.setConfig({
  showToolbar: true,
})

addons.register('my-design-system/default-layout', (api) => {
  api.toggleToolbar(true)
})
