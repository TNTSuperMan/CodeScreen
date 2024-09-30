<script setup>
import {ref,watch} from "vue"
const model = defineProps(["text","scroll"])
const code = ref()
watch(model,()=>
  code.value.scrollTo(0,model.scroll % code.value.scrollHeight))
</script>
<template>
  <code ref="code">{{ model.text }}</code>
</template>
<style scoped>
code{
  position:fixed;
  display:block;
  background:#000;
  padding:10px;
  overflow:hidden;
  white-space:pre-wrap;
  left:0;
  top:0;
  width:calc(70% - 20px);
  height:calc(100% - 40px);
  margin:10px;
  font-size:12px;
}
</style>
