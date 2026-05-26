<template>
  <div class="specs-container">
    <div class="specs-grid">
      <div 
        v-for="spec in specs" 
        :key="spec.label"
        class="spec-item"
      >
        <div class="spec-icon">
          <img :src="spec.icon" :alt="spec.label" class="spec-icon-img">
        </div>
        <span class="spec-label" v-html="spec.label"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  specs: {
    type: Array,
    required: true,
    default: () => [
      {
        icon: '/images/icon1.png',
        label: 'Screen size<br>6.7"'
      },
      {
        icon: '/images/icon3.png',
        label: 'CPU<br>Apple A16 Bionic'
      },
      {
        icon: '/images/icon5.png',
        label: 'Number of Cores<br>6'
      },
      {
        icon: '/images/icon2.png',
        label: 'Main camera<br>48-12 MP'
      },
      {
        icon: '/images/icon4.png',
        label: 'Front-camera<br>12 MP'
      },
      {
        icon: '/images/icon6.png',
        label: 'Battery capacity<br>4323 mAh'
      }
    ]
  }
})
</script>

<style scoped>
/* Стили уже в style-product-details.css */
.specs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.spec-item {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;
  width: 168px;
  background: #F4F4F4;
  border-radius: 7px;
}

.spec-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.spec-icon-img {
  width: 24px;
  height: 24px;
}

.spec-label {
  font-family: 'Abel';
  font-size: 14px;
  line-height: 16px;
  color: #A7A7A7;
}
</style>