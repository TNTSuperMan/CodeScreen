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
const fetchRes = ref({
  type:"",status:"",ok:"",statusText:"",redirected:""})
const fetchTime = ref()
const info = computed(()=>{
  return {
    Type:fetchRes.value.type,
    Status:fetchRes.value.status,
    SText:fetchRes.value.statusText,
    Ok:fetchRes.value.ok,
    Redir:fetchRes.value.redirected,
    Time:fetchTime.value,
    i:i.value,
    char:model.text[i.value],
    asX10:model.text[i.value].charCodeAt(),
    asX16:model.text[i.value].charCodeAt().toString(16),
    SLayer:bracket.square,
    CLayer:bracket.curly,
    PLayer:bracket.parentheses,
    TxtBuf:buf.value
  }
})
let interval = -1;
function frame(){
  model.scroll += 12
  
  for(let j = 0;j < Math.random() * 100;j++){
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
    i.value++
  }
}
function change(url){
  clearInterval(interval)
  i.value = 0;
  bracket.square = 0;
  bracket.parentheses = 0;
  bracket.curly = 0;
  buf.value = ""
  model.scroll = 0;
  let start = Date.now()
  fetch(url)
    .then(e=>{
      fetchTime.value = Date.now() - start;
      fetchRes.value=e;
      return e.text()})
    .then(e=>model.text=e)
}
window.addEventListener("keydown",()=>{
  for(let i = 0;i < Math.random() * 4;i++) frame()
})
change("https://unpkg.com/vue@3.5.10/dist/vue.global.js")
</script>
<template>
  <Code :text="model.text" :scroll="model.scroll"/>
  <Analysis v-model="info" v-model:char="model.text[i]" @filechange="change"/>
</template>
<style scoped>
</style>
