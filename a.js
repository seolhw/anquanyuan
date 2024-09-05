import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import pinyin from "pinyin/dist/pinyin.mjs";
import _ from "lodash"

function getFirstChinese(str) {
  const regex = /[\u4e00-\u9fff]/;
  const match = str.match(regex);
  return match ? match[0] : null;
}


XLSX.set_fs(fs);

const workbook = XLSX.readFile("E:\\vite-demo\\public\\最新安全员题库5.6).xlsx", {
  encoding: "utf-8"
});


const sheet_name_list = workbook.SheetNames;
const worksheet = workbook.Sheets[sheet_name_list[2]];

const data = XLSX.utils.sheet_to_json(worksheet);

const datav = data.map(item => {
  const __EMPTY_0 = item.多选
  delete item.多选
  return {
    ...item,
    __EMPTY_0
  }
})
  .filter(item => {
    return item.__EMPTY_0 && item.__EMPTY_1
  })
  .map(item => {
    const chineseText = getFirstChinese(item.__EMPTY_0);
    const pinyinResult = pinyin(chineseText, {
      style: pinyin.STYLE_FIRST_LETTER
    });
    const firstLetter = pinyinResult[0][0];

    const __EMPTY_0 = item.__EMPTY_0
    delete item.__EMPTY_0
    return {
      ...item,
      __EMPTY: __EMPTY_0,
      __Index: firstLetter.toUpperCase()
    }
  }).sort((a, b) => a.__Index.charCodeAt(0) - b.__Index.charCodeAt(0));

console.log("🚀 ~ datav ~ datav:", datav)



const jsonStr = JSON.stringify(_.groupBy(datav, "__Index"));

fs.writeFileSync("E:\\vite-demo\\public\\public.json", jsonStr)

// console.log("🚀 ~ file ~ file:", )



