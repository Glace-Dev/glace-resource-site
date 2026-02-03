<template>
  <UHeader class="dark:border-b-black/20 backdrop-blur-3x">
    <template #left>
      <div class="flex items-center gap-3">
        <UAvatar
          class="h-10 w-auto"
          alt="avatar"
          size="3xl"
          src="/favicon.ico"
        />
        <UButton
          icon="i-heroicons-bars-3"
          variant="ghost"
          color="neutral"
          size="xl"
          class="hover:bg-(--bg-color-button)/10 active:bg-(--bg-color-button)/20"
          @click="toggleSidebar"
        />
        <h1
          class="text-md sm:text-3xl sm:pl-2 font-bold tracking-wide transition-all duration-300 bg-clip-text text-transparent bg-linear-to-br from-zinc-900 via-zinc-700 to-zinc-400 dark:from-white dark:via-white/80 dark:to-white/20"
        >
          glace的资源站
        </h1>
      </div>
    </template>
    <template #right>
      <UButton
        icon="i-simple-icons-github"
        class="hover:bg-(--bg-color-button)/10 active:bg-(--bg-color-button)/20"
        label="GitHub"
        to="https://github.com/PuppetRuler"
        target="_blank"
        variant="ghost"
        color="neutral"
      />
      <ColorModeButton />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const isSidebarOpen = useSideBarMode();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style lang="scss">
button[aria-label="Open menu"] {
  display: none;
}
</style>
