import { ref } from 'vue'
import type { ChatMessage } from '@/types/chat'

export function useChat() {
  const messages = ref<ChatMessage[]>([])
  const loading = ref(false)

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    messages.value.push({
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    })
  }

  const updateLastMessage = (content: string) => {
    if (messages.value.length > 0) {
      const lastMsg = messages.value[messages.value.length - 1]
      if (lastMsg) {
        lastMsg.content = content
      }
    }
  }

  const setLoading = (status: boolean) => {
    loading.value = status
  }

  return {
    messages,
    loading,
    addMessage,
    updateLastMessage,
    setLoading
  }
}
