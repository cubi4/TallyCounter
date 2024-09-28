<template>
    <div class="MeterForm">
        <!-- -------------------Zähler------------------- -->
        <div class="meterWrapper">
        <h1 class="header">Zähler hinzufügen</h1>
        <div class="inputGroup">
            <label for="nummer">Zählernamen Eingeben:</label>
            <FloatLabel>
                <label for="nummer">meterName</label>
                <InputMask
                    id="tallyId"
                    v-model="meterName"
                    mask="99999999"
                    placeholder="12345678"
                />
            </FloatLabel>
        </div>
        <div class="radioButtonWrapper">
            <div class="radio-item">
                <RadioButton v-model="meterType" inputId="Strom" name="tallyType" value="Strom" />
                <label for="Strom" class="ml-2">Strom</label>
            </div>
            <!-- generieren? -->
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
        <Button label="Zähler hinzufügen" @click="addMeterToStore" icon="pi pi-plus" />
        </div>
        <!-- -------------------Zählerstand------------------- -->
        <div class="meterReadingsWrapper">
            <div class="flexReadings">
                <h1>Zählerstand hinzufügen</h1>
                <div class="">
                    <p>Für welchen Zähler?</p>
                    <Select
                        v-model="selectedMeter"
                        :options="meterOptions"
                        placeholder="Zähler auswählen"
                        class="inputField inputMeterSelect"
                    />
                </div>
                <FloatLabel class="inputFieldAndLabel">
                    <label class="labelinputReaderName" for="name">Vorname Nachname</label>
                    <InputText
                        type="text"
                        id="name"
                        v-model="readerName"
                        placeholder="Max Mustermann"
                        class="inputField inputReaderName"
                    />
                </FloatLabel>
                <FloatLabel class="inputFieldAndLabel">
                    <label for="Wert">Wert</label>
                    <InputMask
                        id="value"
                        v-model="readingCount"
                        mask="99999.999"
                        placeholder="12456.789"
                        class="inputField inputValue"
                    />
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
                    class="inputField inputDate inputFieldAndLabel"
                />
                <div class="flexButtons">
                    <Button
                        label="Eingaben löschen"
                        @click="resetForm"
                        class="p-button-secondary"
                    />
                    <Button
                        label="Zählerstand hinzufügen"
                        @click="addMeterReadingToStore"
                        icon="pi pi-plus"
                    />
                </div>
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
import Select from "primevue/select";
import { ref, computed } from "vue";
import { useMeterStore } from "../stores/useMeterStore";
import { v4 as uuidv4 } from "uuid";

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
    if (!meterName.value || !meterType.value) {
        alert("Bitte füllen Sie alle Zählerdaten aus.");
        return;
    }

    const newMeter = {
        id: uuidv4(), //create random ID
        meterName: meterName.value,
        type: meterType.value,
        readings: [],
    };
    if (meterStore.meters.find((meter) => meter.meterName === newMeter.meterName)) {
        alert("Zählername existiert bereits, bitte geben Sie dem Zähler einen anderen Namen.");
        return;
    }
    meterStore.addMeter(newMeter);

    resetForm();
}

function addMeterReadingToStore() {
    if (!selectedMeter.value) {
        alert("Bitte wählen Sie einen Zähler aus");
        return;
    }
    if (!readerName.value || !readingCount.value || !date.value) {
        alert("Bitte füllen Sie alle Felder für den Zählerstand aus.");
        return;
    }
    const newReading = {
        id: uuidv4(),
        readerName: readerName.value,
        value: readingCount.value,
        date: formatDate(date.value),
    };
    meterStore.addMeterReading(selectedMeter.value, newReading);
    resetForm();
}
</script>

<style scoped>
.MeterForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.meterWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 1rem;
    margin-bottom: 1rem;
    gap: 1rem;
}

.header {
    text-align: left;
    margin-bottom: .2rem;
}

.inputGroup {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.radio-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
}

.radio-item > label {
    margin-left: 0.5rem;
}


/* h1 {
    margin: 1rem 0 0 0;
} */

.meterReadingsWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 1rem;
}

.flexReadings {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.flexButtons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding-bottom: 1rem;
}

.inputFieldAndLabel {
    margin-top: 0.6rem;
}

.inputField {
    width: 50%;
}
</style>
