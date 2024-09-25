<template>
    <div class="meter-overview">
        <h2>Zählerstände</h2>
        <h3>Übersicht</h3>
        <div class="overview-list">
            <div v-for="reading in readings" :key="reading.readerId" class="overview-item">
                <span class="reading-date">{{ reading.date }}</span>
                <span class="reading-value">- {{ reading.value }}: </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MeterReading } from "../types";
import readingsData from '../assets/meterReadings.json';

const readings: MeterReading[] = readingsData.map(reading => ({
  ...reading,
  date: new Date(reading.date)
}));

  
</script>

<style scoped>
.overview-item{
  background-color: rgb(32, 112, 182);
  margin: 10px;
}

</style>
