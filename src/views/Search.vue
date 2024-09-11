<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Cell, Loading, Overlay, Icon, ImagePreview, Image  } from 'vant';
import { createWorker, OEM } from "tesseract.js";
import SearchImage from '@/assets/文字搜索示例图.png';
import PaiImage from '@/assets/拍照搜索示例图.jpg';
import {BackTop, Uploader, Search } from "vant";
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
const searchValue = ref<string>("");

const show = ref<boolean>(false);

const error = ref<any>(null);

const ImageShow = ref<boolean>(false);

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

  const jie = allArray.map(item => {
    const n = stringSimilarity.compareTwoStrings(item.__EMPTY
    , text);
    return {
      ...item,
      n,
    }
  }).filter(item => {
    return item.n > 0.2
  }).slice(0,50).sort((a,b) => b.n - a.n)

  myArray.value.push(...jie)
  show.value=false
};


const search = () => {
  myArray.value = []
  if(!searchValue.value){
    return
  }

  const jie = allArray.map(item => {
    return {
      ...item,
      index_0: item.__EMPTY.indexOf(searchValue.value)
    }
  }).filter(item => {
    return item.index_0 >= 0
  }).slice(0,50).sort((a,b) => a.index_0 - b.index_0)

  myArray.value.push(...jie)
}
</script>

<template>
  <div
    class="overflow-auto flex flex-col"
    style="height: calc(100vh - var(--van-tabbar-height))"
  >
    <div class="flex justify-center pt-5">
      <Uploader :after-read="afterRead" />
      <div class="flex flex-col">
        <Search
          v-model="searchValue"
          placeholder="输入文字搜索"
          @search="search"
        />
        <div
          class="text-center text-orange-500 text-sm underline flex justify-end"
          style="padding: var(--van-search-padding)"
          @click="() => (ImageShow = true)"
        >
          <div><Icon name="question-o" /></div>
          <div class="pl-0.5">查看示例</div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto flex flex-col">
      <div class="text-gray-500 p-4 text-sm border-b-2">
        <div class="flex justify-between">
          <div>搜索结果</div>
          <div v-if="myArray.length > 0">共 {{ myArray.length }} 个结果</div>
        </div>
      </div>
      <div class="flex-1 overflow-auto flex flex-col">
        <div
          class="flex items-center justify-center flex-1 text-gray-500"
          v-if="myArray.length === 0"
        >
          暂无搜索结果
        </div>
        <div v-else class="flex-1">
          <Cell v-for="item in myArray" :id="item.__EMPTY">
            <template #title>
              <span v-if="item.n">
                {{ item.__EMPTY }}
              </span>
              <span v-if="item.index_0 >= 0">
                <span v-for="(v, i) in item.__EMPTY.split(searchValue)">
                  {{ v
                  }}<span
                    class="text-orange-500"
                    v-if="i < item.__EMPTY.split(searchValue).length - 1"
                    >{{ searchValue }}</span
                  >
                </span>
              </span>
            </template>
            <template #label>
              <div class="flex justify-between">
                <div>
                  <span>答案：</span>
                  <span class="text-green-500">{{ item.__EMPTY_1 }}</span>
                </div>
                <div v-if="item.n">
                  匹配度：{{ Math.round(item.n * 100) / 100 }}
                </div>
                <div v-if="item.index_0 >= 0">距离：{{ item.index_0 }}</div>
              </div>
            </template>
          </Cell>
        </div>
        <BackTop />
      </div>
    </div>
    <Overlay class="flex justify-center items-center flex-col" :show="show">
      <Loading size="60" />
    </Overlay>
    <div v-if="error">
      错误信息：
      {{ JSON.stringify(error) }}
    </div>
  </div>
  <ImagePreview
    v-model:show="ImageShow"
    :images="[PaiImage, SearchImage]"
    @change="() => {}"
  >
    <template #image="{ src }">
      <div class="p-10">
        <Image :src="src" />
      </div>
    </template>
  </ImagePreview>

  <!-- <div v-if="log">
    log信息：
    {{ log }}
  </div> -->
</template>

<style scoped></style>
