// src/stores/useMeterStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Meter, MeterReading } from "../types";

export const useMeterStore = defineStore("meterStore", () => {
    const meters = ref<Meter[]>([]);

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


    function removeMeter(meterName: string) {
        meters.value = meters.value.filter((m) => m.meterName !== meterName);
    }

    function clearMeters() {
        meters.value = [];
    }

    return {
        meters,
        getAllMeters,
        addMeter,
        addMeterReading,
        removeMeter,
        clearMeters,
    };
});
