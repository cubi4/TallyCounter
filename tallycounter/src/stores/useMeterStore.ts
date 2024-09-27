// src/stores/useMeterStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Meter, MeterReading } from "../types";

export const useMeterStore = defineStore("meterStore", () => {
    const meters = ref<Meter[]>([]);
    const meterToEdit = ref<Meter | null>(null);
    const readingToEdit = ref<MeterReading | null>(null);
    const isEditingReading = ref(false);

    // Getter
    const getAllMeters = () => meters.value;

    // methods
    function addMeter(newMeter: Meter) {
        meters.value.push(newMeter);
    }

    function addMeterReading(meterName: string, newReading: MeterReading) {
        const meter = meters.value.find((m) => m.meterName === meterName); //name is unique, prevented dulpicate names in meterform
        if (meter) {
            meter.readings.push(newReading);
        }
    }

    function openModalAsMeter(meter: Meter) {
        meterToEdit.value = meter;
        readingToEdit.value = null;
    }

    function closeModalAsMeter() {
        meterToEdit.value = null;
        readingToEdit.value = null;
        isEditingReading.value = false;
    }

    function openModalAsReading(meter: Meter, reading: MeterReading) {
        isEditingReading.value = true;
        readingToEdit.value = reading;
        meterToEdit.value = meter;
    }

    function saveChangesReading(meter: Meter, reading: MeterReading) {
        const index = meters.value.findIndex((m) => m.id === meter.id);
        const readingIndex = meters.value[index].readings.findIndex((r) => r.id === reading.id);
        meters.value[index].readings[readingIndex] = reading;
        meterToEdit.value = null;
        readingToEdit.value = null;
        isEditingReading.value = false;
    }

    function saveChangesMeter(meter: Meter) {
        const index = meters.value.findIndex((m) => m.id === meter.id);
        meters.value[index] = meter;
        meterToEdit.value = null;
    }

    function removeMeter(meter: Meter) {
        meters.value = meters.value.filter((m) => m.id !== meter.id);
    }

    function removeMeterReading(meter: Meter, meterReading: MeterReading) {
        const index = meters.value.findIndex((m) => m.id === meter.id);
        meters.value[index].readings = meters.value[index].readings.filter(
            (r) => r.id !== meterReading.id
        );
    }

    function clearMeters() {
        meters.value = [];
    }

    return {
        meters,
        meterToEdit,
        readingToEdit,
        isEditingReading,
        getAllMeters,
        addMeter,
        addMeterReading,
        openModalAsMeter,
        closeModalAsMeter,
        openModalAsReading,
        saveChangesMeter,
        saveChangesReading,
        removeMeterReading,
        removeMeter,
        clearMeters,
    };
});
