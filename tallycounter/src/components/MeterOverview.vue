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
                <Button
                    label="Löschen"
                    @click="deleteMeter(meter.meterName)"
                    icon="pi pi-trash"
                    class="p-button-danger"
                />
                <Button
                    label="Bearbeiten"
                    @click="editMeter(meter)"
                    icon="pi pi-pen-to-square"
                    class="p-button-warning"
                />
                <div v-for="(reading, rIndex) in meter.readings" :key="rIndex" class="reading-item">
                    <p>Abgelesen von: {{ reading.readerName }}</p>
                    <p>Wert: {{ reading.value }}</p>
                    <p>Datum: {{ reading.date }}</p>
                    <Button
                    label="Zählerstand Löschen"
                    @click="reading.value !== null && deleteMeterReading(meter, reading.value)"
                    icon="pi pi-trash"
                    class="p-button-danger"
                />
                <Button
                    label="Zählerstand Bearbeiten"
                    @click="editMeter(meter)"
                    icon="pi pi-pen-to-square"
                    class="p-button-warning"
                />
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
        <EditModal />
    </div>
</template>

<script setup lang="ts">
// import dummyData from "../assets/dummyData.json";
import { ref } from "vue";
import Select from "primevue/select";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { useMeterStore } from "../stores/useMeterStore";
import { Meter } from "../types.ts";
import EditModal from "./EditModal.vue";

const meterStore = useMeterStore();

const viewOptions = ["Normale Ansicht", "Zähleransicht", "Zähleransicht mit Zählerstand"];
const selectedView = ref("Normale Ansicht");

function editMeter(meter: Meter) {
    meterStore.openModalAsMeter(meter);
}

function deleteMeter(meterName: string) {
    if (confirm(`Bist du sicher, dass du den Zähler ${meterName} löschen möchtest?`)) {
        meterStore.removeMeter(meterName);
    }
}

function editMeterReading(meter: Meter) {
    meterStore.openModalAsMeter(meter);
}

function deleteMeterReading(meter: Meter, value: number) {
    if (confirm(`Bist du sicher, dass du den Zählerstand ${value} vom Zähler ${meter.meterName} löschen möchtest?`)) {
        meterStore.removeMeterReading(meter, value);
    }
}
</script>

<style scoped>
.overview-item {
    border: 1px solid #ccc;
    margin: 10px;
}

.reading-item {
    background-color: rgb(23, 23, 173); /* Leichtes Lila als Hintergrund */
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>
