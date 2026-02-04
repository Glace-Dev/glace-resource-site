export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      link: [
        // 核心：Google 搜索抓取的图标
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // Apple 设备图标（建议也加上）
        { rel: 'apple-touch-icon', href: '/favicon.png' }
      ],
      htmlAttrs: {
        lang: 'zh-CN' // 设置为中文
      }
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://res.glace.top',
    name: 'glace的资源站',
    description: 'glace资源站创建的初衷是为诸位死宅构建一个高质量站点导航，内容涵盖技术开发与二次元ACG，深度整合了从模块开发、AI，到轻小说、Galgame及动漫资源。旨在剔除冗余，仅保留最值得收藏的日常工具。'
  },
  ui: {
    fonts: false
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
