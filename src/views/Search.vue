<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Cell,CellGroup, Loading, Overlay } from 'vant';
import { createWorker, OEM } from "tesseract.js";
import { Uploader } from "vant";
import Compressor from 'compressorjs';
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

const error = ref<any>(null);

// const image = ref<any>("");

const log = ref<any[]>([]);

let worker:Tesseract.Worker;

onMounted( async () => {
  worker = await createWorker("chi_sim",OEM.LSTM_ONLY, {
    logger: m => log.value = [m],
    workerPath: '/worker.min.js',
    langPath: '/lang-data',
    corePath: '/tesseract-core-simd-lstm.wasm.js',
  });
})

onUnmounted(async () => {
  await worker.terminate();
})

const afterRead = async ({ file }: any) => {
  show.value=true
  myArray.value = []

  // 压缩图片
  const nFile: Blob  = await new Promise((res) => {
    new Compressor(file, {
      quality: .8,
      resize: 'contain',
      maxWidth: 800, // 最大宽度
      maxHeight: 600, // 最大高度
      success: (file) => {
        res(file)
      }
    })
  })

  // image.value = URL.createObjectURL(nFile)

  const ret = await worker.recognize(nFile).then(e =>{
    show.value=false
    return e
  })
  .catch(e => {
    console.error(e);  // 处理可能的错误
    error.value = e
    show.value=false
    return Promise.reject(e)
  });
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
  <!-- <img :src="image" alt="" /> -->
  <Overlay :show="show">
    <Loading size="60" />
    <div class="ing">正在搜索...</div>
  </Overlay>
  <div v-if="error">
    错误信息：
    {{ JSON.stringify(error) }}
  </div>
  <!-- <div v-if="log">
    log信息：
    {{ log }}
  </div> -->
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
