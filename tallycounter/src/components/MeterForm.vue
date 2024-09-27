<template>
    <div class="MeterForm">
        <!-- -------------------Zähler------------------- -->
        <h1>Zähler hinzufügen</h1>

        <FloatLabel>
            <label for="nummer">meterName</label>
            <InputMask id="tallyId" v-model="meterName" mask="99999999" placeholder="12345678" />
        </FloatLabel>
        <div style="display: flex; flex-direction: column; width: 100%">
            <div class="radio-item">
                <RadioButton v-model="meterType" inputId="Strom" name="tallyType" value="Strom" />
                <label for="Strom" class="ml-2">Strom</label>
            </div>

            <div class="radio-item">
                <RadioButton v-model="meterType" inputId="Gas" name="tallyType" value="Gas" />
                <label for="Gas" class="ml-2">Gas</label>
            </div>

            <div class="radio-item">
                <RadioButton v-model="meterType" inputId="Wasser" name="tallyType" value="Wasser" />
                <label for="Wasser" class="ml-2">Wasser</label>
            </div>

            <div class="radio-item">
                <RadioButton
                    v-model="meterType"
                    inputId="Heizung"
                    name="tallyType"
                    value="Heizung"
                />
                <label for="Heizung" class="ml-2">Heizung</label>
            </div>

            <div class="radio-item">
                <RadioButton
                    v-model="meterType"
                    inputId="Sonstiges"
                    name="tallyType"
                    value="Sonstiges"
                />
                <label for="Sonstiges" class="ml-2">Sonstiges</label>
            </div>
        </div>
        <Button label="Zähler hinzufügen" @click="addMeterToStore" icon="pi pi-plus"/>

        <!-- -------------------Zählerstand------------------- -->

        <h1>Zählerstand hinzufügen</h1>

        <p>Für welchen Zähler?</p>
        <Select
            v-model="selectedMeter"
            :options="meterOptions"
            placeholder="Ansicht auswählen"
            class="w-full md:w-56"
        />
        <FloatLabel>
            <label for="name">Vorname Nachname</label>
            <InputText type="text" id="name" v-model="readerName" placeholder="Max Mustermann" />
        </FloatLabel>
        <FloatLabel>
            <label for="Wert">Wert</label>
            <InputMask id="value" v-model="readingCount" mask="99999.999" placeholder="12456.789" />
        </FloatLabel>

        <DatePicker
            v-model="date"
            id="date"
            type="date"
            showIcon
            fluid
            :showOnFocus="false"
            :max="maxDate"
            dateFormat="dd.mm.yy"
            :placeholder="maxDateFormatted"
        />
        <!-- generieren? -->
        <Button label="Eingaben löschen" @click="resetForm" class="p-button-secondary"/>
        <Button label="Zählerstand hinzufügen" @click="addMeterReadingToStore" icon="pi pi-plus"/>

        <!-- <div v-for="(meter, index) in meters" :key="index">
            <h3>Zählernummer: {{ meter.meterName }}</h3>
            <p>Zählerart: {{ meter.type }}</p>
            <div v-for="(reading, rIndex) in meter.readings" :key="rIndex">
                <p>Abgelesen von: {{ reading.readerName }}</p>
                <p>Wert: {{ reading.value }}</p>
                <p>Datum: {{ reading.date }}</p>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import InputMask from "primevue/inputmask";
import DatePicker from "primevue/datepicker";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Select from "primevue/select";
import { ref, computed } from "vue";
import { useMeterStore } from "../stores/useMeterStore";

const meterStore = useMeterStore();

//Max Date for Datepicker
const today = new Date();
const maxDate = today.toISOString().split("T")[0];
const maxDateFormatted = maxDate.split("-").reverse().join(".");

//Variables Form input
const meterName = ref("");
const readerName = ref("");
const readingCount = ref(null);
const date = ref(new Date());
const meterType = ref("");

//Variables Select
const selectedMeter = ref(null);
const meterOptions = computed(() => {
    return meterStore.meters.map((meter) => meter.meterName);
});

function resetForm() {
    meterName.value = "";
    readerName.value = "";
    readingCount.value = null;
    date.value = new Date();
    meterType.value = "";
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0"); // adds extra 0 if string.length is < 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // format to dd.mm.yyyy
}

function addMeterToStore() {
    const newMeter = {
        meterName: meterName.value,
        type: meterType.value,
        readings: [],
    };

    meterStore.addMeter(newMeter);

    resetForm();
}

function addMeterReadingToStore() {
    if (!selectedMeter.value) {
        alert("Bitte wählen Sie einen Zähler aus");
        return;
    }

    const newReading = {
        readerName: readerName.value,
        value: readingCount.value,
        date: date.value,
    };

    meterStore.addMeterReading(selectedMeter.value, newReading);
    resetForm();
}
</script>

<style scoped>
.MeterForm {
    margin-top: 50px;
    margin-right: 20px;
    margin-left: 20px;
}
</style>
