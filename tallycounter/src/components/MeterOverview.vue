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
        <div class="overview-list" v-if="selectedView === 'Zähleransicht mit Zählerstand'">
            <div v-for="(meter, index) in meterStore.meters" :key="index" class="overview-item">
                <h3>Zählernummer: {{ meter.meterName }}</h3>
                <p>Zählerart: {{ meter.type }}</p>
                <Button
                    label="Löschen"
                    @click="deleteMeter(meter)"
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
                        @click="deleteMeterReading(meter, reading)"
                        icon="pi pi-trash"
                        class="p-button-danger"
                    />
                    <Button
                        label="Zählerstand Bearbeiten"
                        @click="editMeterReading(meter, reading)"
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
        <div v-if="selectedView === 'Zuletzt hinzugefügt'">
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
import { Meter, MeterReading } from "../types.ts";
import EditModal from "./EditModal.vue";

const meterStore = useMeterStore();

const viewOptions = ["Zuletzt hinzugefügt", "Zähleransicht", "Zähleransicht mit Zählerstand"];
const selectedView = ref("Zuletzt hinzugefügt");

function editMeter(meter: Meter) {
    meterStore.openModalAsMeter(meter);
}

function deleteMeter(meter: Meter) {
    if (confirm(`Bist du sicher, dass du den Zähler ${meter.meterName} löschen möchtest?`)) {
        meterStore.removeMeter(meter);
    }
}

function editMeterReading(meter: Meter, meterReading: MeterReading) {
    meterStore.openModalAsReading(meter, meterReading);
}

function deleteMeterReading(meter: Meter, meterReading: MeterReading) {
    if (
        confirm(
            `Bist du sicher, dass du den Zählerstand ${meterReading.value} vom Zähler ${meter.meterName} löschen möchtest?`
        )
    ) {
        meterStore.removeMeterReading(meter, meterReading);
    }
}


function getLastAdded() {
    const lastAdded = meterStore.meters.map((meter) => meter.readings[meter.readings.length - 1]);
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
