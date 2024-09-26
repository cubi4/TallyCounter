<template>
    <div>
        <FloatLabel>
            <label for="name">Vorname, Nachname</label>
            <InputText type="text" id="name" v-model="readerName" placeholder="Max Mustermann" />
        </FloatLabel>

        <FloatLabel>
            <label for="nummer">meterName</label>
            <InputMask id="tallyId" v-model="meterName" mask="99999999" placeholder="12345678" />
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

        <Button label="Eingaben löschen" @click="resetForm" class="p-button-secondary" />
        <Button label="Zähler hinzufügen" @click="AddMeter" />


        <div v-for="(meter, index) in meters" :key="index">
            <h3>Zählernummer: {{ meter.meterName }}</h3>
            <p>Zählerart: {{ meter.type }}</p>
            <div v-for="(reading, rIndex) in meter.readings" :key="rIndex">
                <p>Abgelesen von: {{ reading.readerName }}</p>
                <p>Wert: {{ reading.value }}</p>
                <p>Datum: {{ reading.date }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import InputMask from "primevue/inputmask";
import DatePicker from "primevue/datepicker";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import { ref } from "vue";
import { Meter } from "../types";

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

function resetForm() {
    meterName.value = "";
    readerName.value = "";
    readingCount.value = null;
    date.value = new Date();
    meterType.value = "";
}

//Aarry for Meters added
const meters = ref<Meter[]>([]);

//Add Meter
function AddMeter() {
    const newMeter = {
        meterName: meterName.value,
        type: meterType.value,
        readings: [
            {   
                readerName: readerName.value,
                value: readingCount.value,
                date: date.value,
            },
        ],
    };
    meters.value.push(newMeter);
    resetForm();
}
</script>

<style scoped></style>
