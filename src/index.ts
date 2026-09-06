/*
 * 只留 tokens：它是所有元件的基礎，一定要載入。
 *
 * 逐元件的 CSS import 刻意拿掉 —— 每個元件檔自己都有 `import './X.css'`，
 * 在這裡再 import 一次會讓「只用一個 Button 也載入全部樣式」變成必然：
 * CSS 在 sideEffects 裡被標成有副作用，從 entry 無條件 import 就搖不掉。
 */
import './tokens/tokens.css'

export { ConfigProvider } from './config/ConfigProvider'
export { ThemeProvider } from './theme/ThemeProvider'
export { en } from './locale/en'
export { zhTW } from './locale/zh-TW'
export { Icon } from './components/Icon/Icon'
export { Button } from './components/Button/Button'
export { Badge } from './components/Badge/Badge'
export { Card } from './components/Card/Card'
export { Table } from './components/Table/Table'
export { Form, FormItem } from './components/Form/Form'
export { FormValidationError } from './components/Form/store'
export { Input } from './components/Input/Input'
export { Textarea } from './components/Textarea/Textarea'
export { Select } from './components/Select/Select'
export { Checkbox } from './components/Checkbox/Checkbox'
export { Switch } from './components/Switch/Switch'
export { Alert } from './components/Alert/Alert'
export { Modal } from './components/Modal/Modal'
export { Empty } from './components/Empty/Empty'
export { Tooltip } from './components/Tooltip/Tooltip'
export { Space } from './components/Space/Space'
export { Tabs } from './components/Tabs/Tabs'
export { Tag } from './components/Tag/Tag'
export { Dropdown } from './components/Dropdown/Dropdown'
export { Pagination } from './components/Pagination/Pagination'

export type { ConfigProviderProps } from './config/ConfigProvider'
export type { ThemeProviderProps, ProductLine } from './theme/ThemeProvider'
export type { Locale } from './locale/types'
export type { IconProps, IconName } from './components/Icon/Icon'
export type { ButtonProps, ButtonVariant } from './components/Button/Button'
export type { BadgeProps } from './components/Badge/Badge'
export type { CardProps } from './components/Card/Card'
export type {
  TableProps,
  TableColumn,
  TableRowSelection,
  TableRowKey,
  TableSort,
  TablePaginationConfig,
  TableChangeInfo,
} from './components/Table/Table'
export type {
  FormProps,
  FormItemProps,
  FormRule,
  FormValues,
  FormInstance,
  ValidateTrigger,
} from './components/Form/Form'
export type { InputProps } from './components/Input/Input'
export type { TextareaProps } from './components/Textarea/Textarea'
export type { SelectProps, SelectOption } from './components/Select/Select'
export type { CheckboxProps } from './components/Checkbox/Checkbox'
export type { SwitchProps } from './components/Switch/Switch'
export type { AlertProps } from './components/Alert/Alert'
export type { ModalProps } from './components/Modal/Modal'
export type { EmptyProps } from './components/Empty/Empty'
export type { TooltipProps } from './components/Tooltip/Tooltip'
export type { SpaceProps } from './components/Space/Space'
export type { TabsProps, TabItem } from './components/Tabs/Tabs'
export type { TagProps } from './components/Tag/Tag'
export type { DropdownProps, DropdownItem } from './components/Dropdown/Dropdown'
export type { PaginationProps } from './components/Pagination/Pagination'
