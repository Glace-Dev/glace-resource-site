interface NavItem {
  name: string
  url: string
  description: string
  logo: string
}

interface NavGroup {
  label: string
  icon: string
  items: NavItem[]
}

interface NavCategory {
  [key: string]: NavGroup
}

// 仅导出最终需要的根数据结构
export interface NavData {
  security: NavCategory
  insecurity: NavCategory
}
