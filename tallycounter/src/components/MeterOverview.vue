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

// dummy data
const readings: MeterReading[] = [
  {
    value: 553426.0,
    readerId: '123',
    date: new Date('2023-01-03'),
  },
  {
    value: 743872.0,
    readerId: '124',
    date: new Date('2023-01-03'),
  },
];
  
</script>

<style scoped></style>
