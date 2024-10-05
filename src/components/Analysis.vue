<script setup>
import {ref,watch} from "vue"
import cdnlist from "@/cdnlist";
const model = defineModel()
const emit = defineEmits(["filechange"])
const uploader = ref()
const url = ref("")
watch(url,()=>emit("filechange",url.value))
const isShowCredit = ref(true)
window.addEventListener("keydown",e=>{
    if(/Digit\d/.test(e.code) && e.altKey){
        let data = cdnlist[parseInt(e.code.substring(5))]
        if(typeof data == "symbol"){
            uploader.value.click()
        }else{
            emit("filechange",data)
        }
    }
})
function load(e){
    const reader = new FileReader()
    reader.addEventListener("load",t=>{
        emit("filechange",t.target.result,1)
    })
    reader.readAsText(e.target.files[0])
}
</script>
<template>
    <input type="file" v-show="false" ref="uploader" @change="load">
    <div class="analysis">
        <table>
            <tr><th>Name</th><th>Data</th></tr>
            <tr v-for="key in Object.keys(model)">
                <th>{{ key }}</th>
                <th>{{ model[key] }}</th>
            </tr>
        </table>
        <a href="about-ja.html" target="_blank" v-if="isShowCredit">
            使い方・クレジット
        </a><br>
        <a href="about-en.html" target="_blank" v-if="isShowCredit">
            How to use / Credit
        </a>
        <button v-if="isShowCredit" @click="isShowCredit=false">X</button>
    </div>
</template>
<style scoped>
div.analysis{
    position:fixed;
    padding:10px;
    margin:10px;
    left:calc(70% + 10px);
    top:0;
    width:calc(30% - 50px);
    height:calc(100% - 40px);
    background:#222;
}
th, td{
    padding:5px;
    border:1px #000 solid;
    text-align:left;
}
select{
    background:#000;
    color:#fff;
}
</style>