<script setup lang="ts">
import { BackTop, Tabs, Tab, IndexBar, IndexAnchor,Cell } from 'vant';
import bool from "@/assets/bool.json"  with { type: "json" };
import danxuan from "@/assets/danxuan.json"  with { type: "json" };
import duoxuan from "@/assets/duoxuan.json"  with { type: "json" };

import { ref } from "vue";

const data = [
  {
    id: 1,
    name: "判断",
    v: bool,
    class: "pan"
  },
  {
    id: 2,
    name: "单选",
    v: danxuan,
    class: "dan"
  },
  {
    id: 3,
    name: "多选",
    v: duoxuan,
    class: "duo"
  },
];

const items = ref(data);


function compClass (itemv: any) {
  let classname = " correct"
  // itemv.__EMPTY_1 === "正确" &&  (classname += " correct")
  itemv.__EMPTY_1 === "错误" &&  (classname += " fail")
  return classname
}
</script>

<template>
  <!-- v-model:active="active" -->
  <Tabs>
    <Tab v-for="item in items" :key="item.id" :title="item.name">
      <!-- {{ item.v }} -->
      <IndexBar style="padding-right: 20px">
        <div v-for="(value, key) in item.v" :id="String(key)">
          <IndexAnchor :index="key" />
          <Cell
            v-for="itemv in value"
            :id="itemv.__EMPTY"
            :title="itemv.__EMPTY"
          >
            <template #label>
              <div :class="compClass(itemv)">答案：{{ itemv.__EMPTY_1 }}</div>
            </template>
          </Cell>
        </div>
      </IndexBar>
    </Tab>
    <BackTop />
  </Tabs>
</template>

<style>
.box {
  padding: 8px;
}

.van-tabs {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: calc(100vh - var(--van-tabbar-height));
}

.van-tabs__content {
  flex: 1;
  overflow: auto;
}

.van-cell__value.pan {
  flex: none;
  width: 50px;
}

.van-cell__value.dan {
  flex: none;
  width: 100px;
}

.van-cell__value.duo {
  flex: none;
  width: 100px;
}

.correct {
  color: green;
}
.fail {
  color: red;
}

/* .van-index-bar__index{
  font-size: 16px;
  line-height: 1.1em;
} */

:root {
  --van-index-bar-index-font-size: 16px;
  --van-index-bar-index-line-height: 1.1em;
}
</style>
