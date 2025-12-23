<script setup lang="ts">
// Removed unused import
</script>

<template>
  <div class="welcome-container">
    <div class="logo-area">
      <div class="logo">D</div>
    </div>

    <div class="features-grid">
      <div class="feature-column">
        <h3 class="column-title">示例</h3>
        <div class="feature-card">"用简单的术语解释量子计算" &rarr;</div>
        <div class="feature-card">"给一个10岁孩子的生日创意" &rarr;</div>
        <div class="feature-card">"如何用 HTTP 请求调用 API？" &rarr;</div>
      </div>

      <div class="feature-column">
        <h3 class="column-title">能力</h3>
        <div class="feature-card static">记住用户之前在对话中说的话</div>
        <div class="feature-card static">允许用户提供后续更正</div>
        <div class="feature-card static">被训练为拒绝不适当的请求</div>
      </div>

      <div class="feature-column">
        <h3 class="column-title">限制</h3>
        <div class="feature-card static">可能偶尔会生成不正确的信息</div>
        <div class="feature-card static">可能偶尔会产生有害的指令</div>
        <div class="feature-card static">对2021年后的世界和事件了解有限</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  color: #333;
}

.logo-area {
  margin-bottom: 40px;
}

.logo {
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 800px;
  width: 100%;
}

.column-title {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}

.feature-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-card {
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card:hover:not(.static) {
  background-color: #e5e5e5;
}

.feature-card.static {
  cursor: default;
}
</style>
