<script setup lang="ts">
import { ref } from 'vue'

const historyGroups = ref([
  {
    title: '今天',
    items: ['Vue3 组件库选型', 'Element Plus X 使用教程']
  },
  {
    title: '昨天',
    items: ['API 接口对接问题', '前端性能优化指南']
  },
  {
    title: '7天前',
    items: ['TypeScript 类型定义', 'Vite 配置详解']
  }
])

const activeItem = ref('')
</script>

<template>
  <div class="sidebar">
    <!-- 新建对话按钮 -->
    <div class="new-chat-btn">
      <div class="btn-content">
        <span class="icon">+</span>
        <span>新建对话</span>
      </div>
      <span class="shortcut">⌘N</span>
    </div>

    <!-- 历史记录列表 -->
    <div class="history-list">
      <div v-for="group in historyGroups" :key="group.title" class="history-group">
        <div class="group-title">{{ group.title }}</div>
        <div 
          v-for="item in group.items" 
          :key="item"
          class="history-item"
          :class="{ active: activeItem === item }"
          @click="activeItem = item"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <!-- 底部用户信息 -->
    <div class="user-profile">
      <div class="avatar">U</div>
      <div class="username">User</div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #f9f9f9;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  padding: 12px;
  flex-shrink: 0;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 20px;
}

.new-chat-btn:hover {
  background-color: #f0f0f0;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.shortcut {
  font-size: 12px;
  color: #999;
}

.history-list {
  flex: 1;
  overflow-y: auto;
}

.group-title {
  font-size: 12px;
  color: #999;
  padding: 8px 12px;
  margin-top: 12px;
}

.history-item {
  padding: 10px 12px;
  font-size: 14px;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.2s;
}

.history-item:hover {
  background-color: #e5e5e5;
}

.history-item.active {
  background-color: #e5e5e5;
}

.user-profile {
  padding: 12px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  cursor: pointer;
  border-radius: 8px;
}

.user-profile:hover {
  background-color: #e5e5e5;
}

.avatar {
  width: 32px;
  height: 32px;
  background-color: #7d3c98;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.username {
  font-size: 14px;
  font-weight: 500;
}
</style>
