<template>
  <li class="media py-2 px-1 cursor" :class="{ 'odd': item?.active }" @click="handleClick">
    <!-- Show skeleton when loading, actual content otherwise -->
    <template v-if="loading">
        <div v-for="(item, i) in 10" :key="i">
            <div class="skeleton-image"></div>
            <div class="media-body py-1">
                <div class="skeleton-title"></div>
                <div class="skeleton-content"></div>
            </div>
        </div>
    </template>
    <template v-else>
      <img class="media-object custom-images" loading="lazy" alt="images description" :src="item.image.url">
      <div class="media-body py-1" title="click to detail">
        <h5 class="mt-0 my-1">{{ item.title }}</h5>
        <p>{{ item.content }}</p>
      </div>
    </template>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['chose-item']);

const handleClick = () => {
  if (!props.loading) {
    emit('chose-item', props.item, props.index);
  }
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}

.custom-images {
  height: 180px;
  width: 180px;
  border-radius: 12px;
}

/* Skeleton styles */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-image {
  height: 180px;
  width: 180px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-title {
  height: 15px;
  width: 70%;
  margin: 8px 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-content {
  height: 25px;
  width: 90%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
</style>