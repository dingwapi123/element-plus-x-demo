<script setup lang="ts">
import { BubbleList } from 'vue-element-plus-x'
import ChatInput from '@/components/ChatInput.vue'
import ChatWelcome from '@/components/ChatWelcome.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useChat } from '@/composables/useChat'
import OpenAI from 'openai'

// 初始化 OpenAI 客户端
const client = new OpenAI({
  apiKey: import.meta.env.VITE_ARK_API_KEY,
  baseURL: '/api/v3',
  dangerouslyAllowBrowser: true,
})

const { messages, loading, addMessage, updateLastMessage, setLoading } = useChat()

// 移除默认欢迎消息，改用 ChatWelcome 组件展示
// if (messages.value.length === 0) {
//   addMessage({
//     role: 'assistant',
//     content: '您好！我是AI助手，有什么可以帮您的？'
//   })
// }

const handleSubmit = async (content: string) => {
  if (!content.trim()) return

  // 添加用户消息
  addMessage({
    role: 'user',
    content,
  })

  // 设置加载状态
  setLoading(true)

  // 添加空的AI回复消息
  addMessage({
    role: 'assistant',
    content: '',
  })

  try {
    const stream = await client.chat.completions.create({
      model: 'doubao-seed-1-6-251015',
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      stream: true,
    })

    let aiContent = ''
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || ''
      aiContent += delta
      updateLastMessage(aiContent)
    }
  } catch (error) {
    console.error('API Call Failed:', error)
    // 标记最后一条消息为错误
    if (messages.value.length > 0) {
      const lastMsg = messages.value[messages.value.length - 1]
      if (lastMsg) {
        lastMsg.isError = true
        lastMsg.content = '抱歉，我暂时无法处理您的请求，请稍后重试。'
      }
    }
  } finally {
    setLoading(false)
  }
}
</script>

<template>
  <div class="app-layout">
    <Sidebar class="app-sidebar" />

    <div class="main-content">
      <div class="chat-area" :class="{ 'has-messages': messages.length > 0 }">
        <template v-if="messages.length === 0">
          <ChatWelcome />
        </template>
        <template v-else>
          <div class="messages-container">
            <BubbleList :messages="messages" />
          </div>
        </template>
      </div>

      <div class="input-area-wrapper">
        <ChatInput :loading="loading" @submit="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: white;
  overflow: hidden;
}

.app-sidebar {
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
}

.chat-area {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px; /* 为底部输入框留出空间 */
}

.chat-area.has-messages {
  justify-content: flex-start;
}

.messages-container {
  padding: 20px 0;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.input-area-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 20%);
  padding-bottom: 20px;
  padding-top: 40px;
}
</style>
