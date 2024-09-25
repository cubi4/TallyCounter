<template>
    <div class="meter-overview">
        <h2>Zählerstände</h2>
        <h3>Übersicht</h3>
        <div class="overview-list">
            <div v-for="element in data" :key="element.readerId" class="overview-item">
                <span class="reading-date">{{ element.date }}</span>
                <span class="reading-value">{{ element?.readings?.map(e => e.value) || 'No readings available' }}: </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { Meter } from "../types";
import { ref } from 'vue';
import dummyData from "../assets/dummyData.json";

const data = ref(dummyData);

</script>

<style scoped>
.overview-item {
    background-color: rgb(32, 112, 182);
    margin: 10px;
}
</style>
