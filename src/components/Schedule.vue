<template>
    <div>
        <h1>Schedules</h1>
        <label>Select year:
            <select v-model="year">
                <option :key="'year'+2017+n" :value="2017+n" v-for="n in 3">{{ 2017+n }}</option>
            </select>
        </label>
    </div>
</template>
<script>
export default {
    data() {
        year:'2018'
    }
}
</script>