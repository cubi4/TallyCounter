<template>
    <div class="meter-overview">
        <h2>Zählerstände</h2>
        <h3>Übersicht</h3>
        <div class="overview-list">
            <div v-for="(meter, index) in meters" :key="index" class="overview-item">
                <h3>Zählernummer: {{ meter.meterName }}</h3>
                <p>Zählerart: {{ meter.type }}</p>
                <div v-for="(reading, rIndex) in meter.readings" :key="rIndex">
                    <p>Abgelesen von: {{ reading.readerName }}</p>
                    <p>Wert: {{ reading.value }}</p>
                    <p>Datum: {{ reading.date }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
// import dummyData from "../assets/dummyData.json";
import { Meter } from "../types";

const props = defineProps<{ meters: Meter[] }>();

console.log(props.meters);
</script>

<style scoped>
.overview-item {
    background-color: rgb(32, 112, 182);
    margin: 10px;
}
</style>
