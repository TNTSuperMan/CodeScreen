<script setup>
import {ref,watch} from "vue"
import cdnlist from "@/cdnlist";
const model = defineModel()
const emit = defineEmits(["filechange"])
const url = ref("")
watch(url,()=>emit("filechange",url.value))
</script>
<template>
    <div class="analysis">
        <table>
            <tr><th>Name</th><th>Data</th></tr>
            <tr>
                <th>Change</th>
                <th>
                    <select v-model="url">
                        <option v-for="data in Object.keys(cdnlist)" :value="cdnlist[data]">{{ data }}</option>
                    </select>
                </th>
            </tr>
            <tr v-for="key in Object.keys(model)">
                <th>{{ key }}</th>
                <th>{{ model[key] }}</th>
            </tr>
        </table>
        
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