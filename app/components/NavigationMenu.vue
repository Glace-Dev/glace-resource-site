<template>
  <aside
    :class="[
      'h-full border-r dark:border-black/20 border-gray-400 backdrop-blur-xl rounded-r-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out z-20',
      !isSidebarOpen ? 'w-20' : 'w-fit md:w-44'
    ]"
  >
    <nav class="flex-1 overflow-y-auto pt-4 px-3 space-y-1 scrollbar-hide">
      <button
        v-for="(group, key) in items"
        :key="key"
        :class="[
          'w-full flex items-center rounded-lg transition-all duration-300 group text-md pl-4 h-12 px-0 relative',
          activeSection === key
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'text-gray-800 hover:bg-gray-200 hover:text-black  dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
        ]"
        :title="!isSidebarOpen ? group.label : undefined"
        @click="handleNavigate(key as string)"
      >
        <UIcon
          :name="group.icon"
          :class="[
            'shrink-0 transition-all duration-300',
            !isSidebarOpen ? 'text-2xl' : 'text-xl'
          ]"
        />

        <span
          :class="[
            'font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out',
            !isSidebarOpen
              ? 'opacity-0 max-w-0 ml-0'
              : 'opacity-100 max-w-30 ml-3'
          ]"
        >
          {{ group.label }}
        </span>

        <div
          v-if="activeSection === key"
          class="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
        />
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import navDataJson from '~/assets/data/nav.json'

// 类型定义
interface NavItem {
  name: string
  url: string
  description: string
  logo: string
}

// 单个分类的详细结构
interface NavGroup {
  label: string
  icon: string
  items: NavItem[]
}

// 分类集合（对象结构）
// Record<string, NavGroup> 表示：键是字符串，值是 NavGroup 对象
interface NavCategory {
  [key: string]: NavGroup
}

// 根数据结构
interface NavData {
  security: NavCategory
  insecurity: NavCategory
}

// 使用断言将其转为我们定义的接口类型
const navData = navDataJson as NavData
// 获取nav状态
const navMode = useNavMode()

// 假设默认显示 security 内容
const items = computed(() => {
  return navData[navMode.value]
})

// 订阅全局状态
const isSidebarOpen = useState<boolean>('isSidebarOpen', () => true)
const activeSection = useState<string>('activeNavId', () => 'anime')
const isManualScrolling = useState<boolean>('isManualScrolling', () => false)

onMounted(() => {
  isSidebarOpen.value = window.innerWidth >= 768 ? true : false
})

const handleNavigate = (key: string) => {
  activeSection.value = key

  const container = document.getElementById('scroll-container')
  const target = document.getElementById(key)

  if (container && target) {
    isManualScrolling.value = true

    // 精准相对定位计算：(目标相对于视口距离 - 容器相对于视口距离) + 当前容器滚动高度
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const scrollTarget
      = container.scrollTop + (targetRect.top - containerRect.top)

    container.scrollTo({
      top: scrollTarget - 20, // 预留 20px 顶部边距
      behavior: 'smooth'
    })

    // 延时解锁，等待平滑滚动完成
    setTimeout(() => {
      isManualScrolling.value = false
    }, 1000)
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
