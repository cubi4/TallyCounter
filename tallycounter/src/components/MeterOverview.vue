<template>
    <div class="meter-overview">
        <h2>Zählerstände</h2>
        <h3>Übersicht</h3>
        <Select
            v-model="selectedView"
            :options="viewOptions"
            placeholder="Ansicht auswählen"
            class="w-full md:w-56"
        />
        <div class="overview-list" v-if="selectedView === 'Normale Ansicht'">
            <div v-for="(meter, index) in meterStore.meters" :key="index" class="overview-item">
                <h3>Zählernummer: {{ meter.meterName }}</h3>
                <p>Zählerart: {{ meter.type }}</p>
                <div v-for="(reading, rIndex) in meter.readings" :key="rIndex">
                    <p>Abgelesen von: {{ reading.readerName }}</p>
                    <p>Wert: {{ reading.value }}</p>
                    <p>Datum: {{ reading.date }}</p>
                </div>
            </div>
        </div>
        <div v-if="selectedView === 'Zähleransicht'">
            <div v-for="(meter, index) in meterStore.meters" :key="index" class="overview-item">
                <h3>Zählernummer: {{ meter.meterName }}</h3>
                <p>Zählerart: {{ meter.type }}</p>
            </div>
        </div>
        <div v-if="selectedView === 'Zähleransicht mit Zählerstand'">
            <div v-for="(meter, index) in meterStore.meters" :key="index" class="overview-item">
                <h3>Zählernummer: {{ meter.meterName }}</h3>
                <p>Zählerart: {{ meter.type }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import dummyData from "../assets/dummyData.json";
import { ref } from "vue";
import Select from "primevue/select";
import { useMeterStore } from '../stores/useMeterStore';


const meterStore = useMeterStore();

const viewOptions = ["Normale Ansicht", "Zähleransicht", "Zähleransicht mit Zählerstand"];
const selectedView = ref("Normale Ansicht");

</script>

<style scoped>
.overview-item {
    background-color: rgb(32, 112, 182);
    margin: 10px;
}
</style>

