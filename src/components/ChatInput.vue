<script setup lang="ts">
import { ref } from 'vue'
import { EditorSender } from 'vue-element-plus-x'

const props = defineProps<{
  loading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', content: string): void
}>()

const inputValue = ref('')

const handleSubmit = (payload: string | { text?: string } | undefined) => {
  let content = ''
  if (typeof payload === 'string') {
    content = payload
  } else if (typeof payload === 'object' && payload !== null && 'text' in payload) {
    content = payload.text || ''
  } else {
    content = inputValue.value
  }

  if (content.trim()) {
    emit('submit', content)
    inputValue.value = ''
  }
}
</script>

<template>
  <div class="input-container">
    <div class="input-wrapper">
      <EditorSender
        v-model="inputValue"
        placeholder="给“豆包”发送消息"
        :loading="loading"
        :disabled="disabled"
        submit-type="enter"
        @submit="handleSubmit"
        class="custom-sender"
      />
      <div class="footer-tip">
        AI 生成的内容可能不准确，请核对重要信息。
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  padding: 20px;
  background-color: transparent;
  display: flex;
  justify-content: center;
}

.input-wrapper {
  width: 100%;
  max-width: 800px;
  position: relative;
}

.footer-tip {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 12px;
}

/* 深度选择器覆盖 EditorSender 样式以匹配 GPT 风格 */
:deep(.epx-editor-sender) {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  background-color: white;
  padding: 8px;
}

:deep(.epx-editor-sender:focus-within) {
  border-color: #d1d1d1;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
}
</style>
