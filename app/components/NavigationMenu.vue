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
            : 'text-gray-800 hover:bg-primary/5 dark:hover:bg-primary-50/10 hover:text-black  dark:text-gray-400 dark:hover:text-white'
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

// 使用断言将其转为我们定义的接口类型
const navData = navDataJson as NavData
// 获取nav状态
const navMode = useNavMode()

// 假设默认显示 security 内容
const items = computed(() => {
  return navData[navMode.value]
})

// 获取全局状态
const isSidebarOpen = useSideBarMode()
const activeSection = useActiveNavId()
const isManualScrolling = useManualScrolling()

const handleNavigate = (key: string) => {
  const container = document.getElementById('scroll-container')
  const target = document.getElementById(key)

  if (container && target) {
    // 1. 立即锁定：阻止 IntersectionObserver 的回调逻辑
    isManualScrolling.value = true
    // 2. 立即更新 UI 高亮
    activeSection.value = key

    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const scrollTarget = container.scrollTop + (targetRect.top - containerRect.top)

    // 3. 执行平滑滚动
    container.scrollTo({
      top: scrollTarget - 20,
      behavior: 'smooth'
    })

    // 4. 精准解锁：监听滚动停止
    // 使用一次性监听器 (once: true)
    const handleScrollEnd = () => {
      // 延迟一小段时间确保 Observer 回调彻底走完
      setTimeout(() => {
        isManualScrolling.value = false
      }, 50)
    }

    // 优先使用现代浏览器的 scrollend 事件，否则回退到 setTimeout
    if ('onscrollend' in window) {
      container.addEventListener('scrollend', handleScrollEnd, { once: true })
    } else {
      // 回退方案：根据滚动距离动态计算或使用固定长延迟
      setTimeout(handleScrollEnd, 800)
    }
  }
}

onMounted(() => {
  isSidebarOpen.value = window.innerWidth >= 768
})
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
