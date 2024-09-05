<script setup lang="ts">
import { Tabbar, TabbarItem } from "vant";
</script>

<template>
  <main>
    <RouterView />
    <Tabbar route>
      <TabbarItem replace to="/" icon="home-o">题库</TabbarItem>
      <TabbarItem replace to="/search" icon="search">搜索</TabbarItem>
    </Tabbar>
  </main>
</template>
<style></style>
