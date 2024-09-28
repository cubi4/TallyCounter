<template>
    <div class="meter-overview">
        <h1>Zählerstände</h1>
        <div class="headerContainer">
            <h3>Übersicht</h3>
            <Select
                v-model="selectedView"
                :options="viewOptions"
                placeholder="Ansicht auswählen"
                class="w-full md:w-56"
            />
        </div>
        <div class="overview-list-container">
            <div class="overview-list" v-if="selectedView === 'Zähleransicht mit Zählerstand'">
                <div v-for="(meter, index) in meterStore.meters" :key="index" class="overview-item">
                    <div class="meterOverview">
                        <h3>Zählernummer: {{ meter.meterName }}</h3>
                        <p>Zählerart: {{ meter.type }}</p>
                    </div>

                    <div class="button-container">
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
                    </div>
                    <Button
                        @click="toggleReadings(index)"
                        :icon="expandedMeters[index] ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
                        class="p-button-text"
                    />
                    <div
                        v-if="expandedMeters[index]"
                        v-for="(reading, rIndex) in meter.readings"
                        :key="rIndex"
                        class="reading-item"
                    >
                        <div class="meterReadingsOverview">
                            <p>
                                Abgelesen von: <b>{{ reading.readerName }}</b>
                            </p>
                            <p>
                                Wert: <b>{{ reading.value }}</b>
                            </p>
                            <p>
                                Datum: <b>{{ reading.date }}</b>
                            </p>
                        </div>
                        <div class="button-container">
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
            </div>
            <div v-if="selectedView === 'Zähleransicht'">
                <div v-for="(meter, index) in meterStore.meters" :key="index" class="overview-item">
                    <div class="meterOverview">
                        <h3>Zählernummer: {{ meter.meterName }}</h3>
                        <p>Zählerart: {{ meter.type }}</p>
                    </div>
                    <div class="button-container">
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
                    </div>
                </div>
            </div>
        </div>

        <EditModal />
    </div>
</template>

<script setup lang="ts">
// import dummyData from "../assets/dummyData.json";
import { ref, watch } from "vue";
import Select from "primevue/select";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { useMeterStore } from "../stores/useMeterStore";
import { Meter, MeterReading } from "../types.ts";
import EditModal from "./EditModal.vue";

const meterStore = useMeterStore();

const viewOptions = ["Zähleransicht mit Zählerstand", "Zähleransicht"];
const selectedView = ref("Zähleransicht mit Zählerstand");

const expandedMeters = ref<boolean[]>([]);

watch(
    () => meterStore.meters,
    (meters: Meter[]) => {
        expandedMeters.value = meters.map(() => false);
    }
);

// ------------------Functions Meter------------------
function editMeter(meter: Meter) {
    meterStore.openModalAsMeter(meter);
}

function deleteMeter(meter: Meter) {
    if (
        confirm(
            `Bist du sicher, dass du den Zähler ${meter.meterName} löschen möchtest? Alle Zählerstände dieses Zählers werden ebenfalls gelöscht.`
        )
    ) {
        meterStore.removeMeter(meter);
    }
}

// ------------------Functions MeterReading------------------
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

function toggleReadings(index: number) {
    expandedMeters.value[index] = !expandedMeters.value[index];
}
</script>

<style scoped>
/* ---------General--------- */

.headerContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.overview-list-container {
    width: 100%;
    max-height: 75vh;
    overflow-y: auto;
}

.overview-item {
    flex-direction: column;
    background-color: #595673;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
}

/* ---------Meter-Representation--------- */
.meterOverview {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
}
.button-container {
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0rem 1rem;
}

/* ---------MeterReading-Representation--------- */
.meterReadingsOverview {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
}

.reading-item {
    background-color: #b4b3c6;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
}

.meterReadingsOverview p {
    text-align: left;
}
.meterReadingsOverview p:first-child {
    flex: 3;
}
.meterReadingsOverview p:nth-child(2),
.meterReadingsOverview p:nth-child(3) {
    flex: 2;
}
</style>
