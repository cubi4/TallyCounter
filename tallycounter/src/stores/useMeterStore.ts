// src/stores/useMeterStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Meter, MeterReading } from "../types";

export const useMeterStore = defineStore("meterStore", () => {
    const meters = ref<Meter[]>([]);
    const meterToEdit = ref<Meter | null>(null);
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
    }

    function closeModalAsMeter() {
        meterToEdit.value = null;
    }

    function saveChanges(meter: Meter) {
        const index = meters.value.findIndex((m) => m.meterName === meter.meterName);
        meters.value[index] = meter;
        meterToEdit.value = null;
    }

    function removeMeter(meterName: string) {
        meters.value = meters.value.filter((m) => m.meterName !== meterName);
    }

    function removeMeterReading(meter: Meter, value: number) {
        const index = meters.value.findIndex((m) => m.meterName === meter.meterName);
        meters.value[index].readings = meters.value[index].readings.filter((i) => i.value !== value);
    }

    function clearMeters() {
        meters.value = [];
    }

    return {
        meters,
        meterToEdit,
        getAllMeters,
        addMeter,
        addMeterReading,
        openModalAsMeter,
        closeModalAsMeter,
        saveChanges,
        removeMeterReading,
        removeMeter,
        clearMeters,
    };
});
