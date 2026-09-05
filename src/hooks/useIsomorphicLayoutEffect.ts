import { useEffect, useLayoutEffect } from 'react'

/**
 * SSR 下沒有 layout 階段；直接用 useLayoutEffect 會在 server render 時噴警告。
 * 需要「在瀏覽器繪製前完成」的副作用（量尺寸、移動焦點）用這個。
 */
export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
