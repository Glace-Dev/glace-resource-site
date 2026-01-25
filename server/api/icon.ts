export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string

  console.log(url)

  return sendRedirect(event, url)

  // if (!url) {
  //   return sendRedirect(event, '/img/global.png')
  // }

  // // 处理 base64 图片 - 直接返回
  // if (url.startsWith('data:image/')) {
  //   try {
  //     const matches = url.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/)
  //     if (!matches) {
  //       throw new Error('Invalid base64')
  //     }
  //     const buffer = Buffer.from(matches[2], 'base64')
  //     return buffer
  //   } catch (error) {
  //     console.error('[Icon API] Base64 error:', error)
  //     return sendRedirect(event, '/img/global.png')
  //   }
  // }

  // // 处理远程 URL
  // try {
  //   const response = await fetch(url, {
  //     signal: AbortSignal.timeout(5000) // 5秒超时
  //   })

  //   if (!response.ok) {
  //     throw new Error(`HTTP ${response.status}`)
  //   }

  //   const arrayBuffer = await response.arrayBuffer()
  //   const buffer = Buffer.from(arrayBuffer)

  //   return buffer
  // } catch (error) {
  //   // 只打印简单的错误信息
  //   const errMsg = error instanceof Error ? error.message : String(error)
  //   console.error('[Icon API] Failed:', url, '-', errMsg)
  //   return sendRedirect(event, '/img/global.png')
  // }
})
