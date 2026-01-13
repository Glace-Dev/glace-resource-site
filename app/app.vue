<template>
  <UApp>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'glace的资源站',
  description: 'glace资源站创建的初衷是为诸位死宅构建一个高质量站点导航，内容涵盖技术开发与二次元ACG，深度整合了从模块开发、AI，到轻小说、Galgame及动漫资源。旨在剔除冗余，仅保留最值得收藏的日常工具。',
  keywords: '二次元,动漫,Galgame,效率工具,AI工具,资源搜索,网盘搜索,网络服务,VPN,前端开发',

  // Open Graph (用于微信、Discord、Facebook 等社交分享)
  ogTitle: 'glace的资源站',
  ogDescription: 'glace资源站创建的初衷是为诸位死宅构建一个高质量站点导航，内容涵盖技术开发与二次元ACG，深度整合了从模块开发、AI，到轻小说、Galgame及动漫资源。旨在剔除冗余，仅保留最值得收藏的日常工具。',
  ogImage: '/public/img/home.png', // 预览图
  ogUrl: 'https://res.glace.top',
  ogType: 'website',

  // Twitter / X 卡片
  twitterCard: 'summary_large_image', // 可选: 'summary', 'summary_large_image', 'app', 'player'
  twitterTitle: 'glace的资源站',
  twitterDescription: 'glace资源站创建的初衷是为诸位死宅构建一个高质量站点导航，内容涵盖技术开发与二次元ACG，深度整合了从模块开发、AI，到轻小说、Galgame及动漫资源。旨在剔除冗余，仅保留最值得收藏的日常工具。',
  twitterImage: '/public/img/home.png'
})
</script>
