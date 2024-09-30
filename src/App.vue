<script setup>
import {reactive,ref,computed} from "vue"
import Code from "./components/Code.vue"
import Analysis from "./components/Analysis.vue"
const model = reactive({
  text:"Loading...",
  scroll:0
})
const i = ref(0)
const bracket = reactive({
  curly:0,
  square:0,
  parentheses:0
})
const buf = ref("")
const info = computed(()=>{
  return {
    i:i.value,
    char:model.text[i.value],
    SquareLayer:bracket.square,
    CurlyLayer:bracket.curly,
    ParenthesesLayer:bracket.parentheses,
    TextBuffer:buf.value
  }
})
let interval = -1;
function change(url){
  clearInterval(interval)
  i.value = 0;
  bracket.square = 0;
  bracket.parentheses = 0;
  bracket.curly = 0;
  buf.value = ""
  model.scroll = 0;
  fetch(url).then(e=>e.text()).then(e=>model.text=e)
  .then(()=>{
    
    interval = setInterval(() => {
      i.value++
      model.scroll += 10
      
      let isClear = true
      switch(info.value.char){
        case "(":bracket.parentheses++;break;
        case ")":bracket.parentheses--;break;
        case "[":bracket.square++;break;
        case "]":bracket.square--;break;
        case "{":bracket.curly++;break;
        case "}":bracket.curly--;break;
        case ",":case ";":break;
        default:
          isClear = false
          buf.value += info.value.char;
          break;
      }
      if(isClear) buf.value = ""
    }, 10);
  })
}
change("https://unpkg.com/vue@3.5.10/dist/vue.global.js")
</script>
<template>
  <Code :text="model.text" :scroll="model.scroll"/>
  <Analysis v-model="info" v-model:char="model.text[i]" @filechange="change"/>
</template>
<style scoped>
</style>
