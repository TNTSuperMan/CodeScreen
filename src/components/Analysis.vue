<script setup>
import {ref,watch} from "vue"
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
                        <option value="https://unpkg.com/vue@3.5.10/dist/vue.global.js">vue3</option>
                        <option value="https://cdn.jsdelivr.net/npm/vue">vue3 min</option>
                        <option value="https://cdn.jsdelivr.net/npm/vue@2.7.11/dist/vue.js">vue2</option>
                        <option value="https://cdn.jsdelivr.net/npm/vue@2.7.11/dist/vue.min.js">vue2 min</option>
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