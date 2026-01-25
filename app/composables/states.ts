// composables/state.ts

export const useSideBarMode = () => useState<boolean>('sidebar-mode', () => true)
export const useNavMode = () => useState<'security' | 'insecurity'>('nav-mode', () => 'security')
export const useActiveNavId = () => useState<string>('activeNavId', () => 'light_novel')
export const useManualScrolling = () => useState<boolean>('manualScrolling-mode', () => false)

export const useNavigationStore = () => {
  const activeSection = useActiveNavId()
  const isManualScrolling = useManualScrolling()
  const navMode = useNavMode()

  // 逻辑 A：处理滚动时的自动高亮
  const handleObserverEntries = (entries: IntersectionObserverEntry[]) => {
    if (isManualScrolling.value) return
    let maxRatio = 0
    let activeKey = ''
    entries.forEach((entry) => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio
        activeKey = (entry.target as HTMLElement).dataset.section || ''
      }
    })
    if (activeKey && activeKey !== activeSection.value) {
      activeSection.value = activeKey
    }
  }

  // 逻辑 B：处理点击侧边栏的精准跳转
  const scrollToSection = (key: string) => {
    activeSection.value = key

    const container = document.getElementById('scroll-container')
    const target = document.getElementById(key)

    if (container && target) {
      // 锁定：停止 Observer 的自动更新
      isManualScrolling.value = true

      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const scrollTarget = container.scrollTop + (targetRect.top - containerRect.top)

      container.scrollTo({
        top: scrollTarget - 20,
        behavior: 'smooth'
      })

      // 延时解锁：等待平滑滚动完成后，重新允许 Observer 监听
      // 这里的 800ms-1000ms 视滚动距离而定
      setTimeout(() => {
        isManualScrolling.value = false
      }, 1000)
    }
  }

  return {
    navMode,
    activeSection,
    isManualScrolling,
    handleObserverEntries,
    scrollToSection
  }
}
