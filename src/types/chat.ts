export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  isError?: boolean
  loading?: boolean
}

export interface User {
  id: string
  name: string
  avatar: string
}
