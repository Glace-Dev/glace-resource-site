export const useSideBarMode = () => useState<true | false>('sidebar-mode', () => true)
export const useNavMode = () => useState<'security' | 'insecurity'>('nav-mode', () => 'security')
export const useActiveNavId = () => useState<string>('activeNavId', () => 'light_novel')
export const useManualScrolling = () => useState<boolean>('manualScrolling-mode', () => false)
