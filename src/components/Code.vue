<script setup>
import {ref,watch,onMounted} from "vue"
const model = defineProps(["text","scroll"])
const code = ref()
let height = 0
onMounted(()=>height=code.value.scrollHeight)
watch(model,()=>code.value.scroll(0,model.scroll%height))
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
}
</style>
