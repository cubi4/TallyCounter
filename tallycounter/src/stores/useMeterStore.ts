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
        const meter = meters.value.find((m) => m.meterName === meterName);
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
        const index = meters.value.findIndex((m) => m.meterName === meter.meterName);
        const readingIndex = meters.value[index].readings.findIndex(
            (r) =>
                r.value === reading.value &&
                r.date === reading.date &&
                r.readerName === reading.readerName
        );
        meters.value[index].readings[readingIndex] = reading;
        meterToEdit.value = null;
        readingToEdit.value = null;
        isEditingReading.value = false;
    }

    function saveChangesMeter(meter: Meter) {
        const index = meters.value.findIndex((m) => m.meterName === meter.meterName);
        meters.value[index] = meter;
        meterToEdit.value = null;
    }

    function removeMeter(meterName: string) {
        meters.value = meters.value.filter((m) => m.meterName !== meterName);
    }

    function removeMeterReading(meter: Meter, meterReading: MeterReading) {
        const index = meters.value.findIndex((m) => m.meterName === meter.meterName);
        meters.value[index].readings = meters.value[index].readings.filter(
            (r) => r.value !== meterReading.value
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
