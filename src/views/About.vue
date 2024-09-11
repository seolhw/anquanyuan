<script setup lang="ts">
import { showNotify } from "vant";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("无法复制文本: ", err);
  }
};

const copyEmail = () => {
  copyToClipboard("seolhw@qq.com");
  showNotify({ type: "success", message: "复制成功: seolhw@qq.com" });
};

const copyPhone = () => {
  copyToClipboard("13832246076");
  showNotify({ type: "success", message: "复制成功: 13832246076" });
};
</script>

<template>
  <div class="flex flex-col h-96 items-center justify-center">
    <div>本项目由 huiwang 开发，如有问题，请联系作者</div>
    <br />
    <div class="flex">
      <div>邮箱：seolhw@qq.com</div>
      <div
        class="text-center text-orange-500 text-sm underline flex justify-end pl-4"
        @click="copyEmail"
      >
        复制
      </div>
    </div>
    <div class="flex">
      <div>手机/微信：13832246076</div>
      <div
        class="text-center text-orange-500 text-sm underline flex justify-end pl-4"
        @click="copyPhone"
      >
        复制
      </div>
    </div>
  </div>
</template>
<style></style>
