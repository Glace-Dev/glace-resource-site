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

// 获取状态与数据
const navData = navDataJson as NavData
const isSidebarOpen = useSideBarMode()

// 从 Store 中解构逻辑
const { navMode, activeSection, scrollToSection } = useNavigationStore()

// 计算当前显示的菜单项
const items = computed(() => navData[navMode.value])

// 生命周期
onMounted(() => {
  isSidebarOpen.value = window.innerWidth >= 768
})

// 交互处理
const handleNavigate = (key: string) => {
  // 调用 Store 中的封装逻辑
  scrollToSection(key)
}
</script>

<style scoped lang="scss">
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
