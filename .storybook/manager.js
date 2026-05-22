import { addons } from 'storybook/manager-api'

addons.setConfig({
  bottomPanelHeight: 0,
  rightPanelWidth: 0,
  showToolbar: true,
})

addons.register('my-design-system/default-layout', (api) => {
  api.toggleToolbar(true)
  api.togglePanel(false)
})
