<script setup lang="ts">
import MeterOverview from "./components/MeterOverview.vue";
import MeterForm from "./components/MeterForm.vue";
import { Meter } from './types';
import { ref } from 'vue';

const metersData = ref<Meter[]>([]);

function addMeterToList(newMeter: Meter) {
  metersData.value.push(newMeter);
}

</script>

<template>
    <div class="app">
        <MeterOverview class="MeterOverview" :meters="metersData"/>
        <MeterForm class="MeterForm" @add-meter="addMeterToList"/>
    </div>
</template>

<style scoped>
.app {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;
}

.MeterOverview {
    flex: 1;
}

.MeterForm {
    flex: 2;
}
</style>
