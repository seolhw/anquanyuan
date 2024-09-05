<script setup lang="ts">
const topaishe = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      console.log("🚀 ~ .then ~ stream:", stream);
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
};

defineExpose({ topaishe });
</script>

<template>
  <div>
    <button @click="topaishe">拍摄照片</button>
    <input type="file">
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
