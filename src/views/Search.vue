<script setup lang="ts">
import { ref } from 'vue'
import { Cell,CellGroup, Loading, Overlay } from 'vant';
import { createWorker } from "tesseract.js";
import { Uploader, UploaderAfterRead } from "vant";
// @ts-ignore
import stringSimilarity from 'string-similarity'

import bool from "@/assets/bool.json"  with { type: "json" };
import danxuan from "@/assets/danxuan.json"  with { type: "json" };
import duoxuan from "@/assets/duoxuan.json"  with { type: "json" };

const boolArr = Object.values(bool).flat()
const danArr = Object.values(danxuan).flat()
const duoArr = Object.values(duoxuan).flat()

const allArray = boolArr.concat(danArr, duoArr)

const myArray = ref<any[]>([]);

const show = ref<boolean>(false);


const afterRead = async ({ file }: any) => {
  show.value=true
  myArray.value = []
  const worker = await createWorker("chi_sim");
  const ret = await worker.recognize(file);
  await worker.terminate();
  const text = ret.data.text.replace(/\n/g, '')

  const jie = allArray.filter(item => {
    const n = stringSimilarity.compareTwoStrings(item.__EMPTY
    , text);
    return n > 0.5
  })

  myArray.value.push(...jie)
  show.value=false
};
</script>

<template>
  <div class="search">
    <Uploader :after-read="afterRead" />
  </div>

  <div v-if="myArray.length !== 0">
    <CellGroup title="搜索结果">
      <Cell v-for="item in myArray" :id="item.__EMPTY" :title="item.__EMPTY">
        <template #label>
          <div class="correct">答案：{{ item.__EMPTY_1 }}</div>
        </template>
      </Cell>
    </CellGroup>
  </div>
  <Overlay :show="show">
    <Loading size="60" />
    <div class="ing">正在搜索...</div>
  </Overlay>
</template>

<style scoped>
.search {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.van-overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.ing {
  padding-top: 20px;
}

.correct {
  color: green;
}
/* Your styles here */
</style>
