<template>
    <Dialog
        v-model:visible="isVisible"
        :header="isEditingReading ? 'Zählerstand bearbeiten' : 'Zähler bearbeiten'"
        :modal="true"
        :closable="false"
        :style="{ width: '30rem' }"
    >
        <template v-if="!isEditingReading" class="MeterModal">
            <div class="input-group">
                <label for="nummer">Zählernummer: </label>
                <InputMask
                    id="nummer"
                    v-model="meterToEdit.meterName"
                    mask="99999999999999"
                    placeholder="14-Ziffern-Zählernummer"
                    :invalid="!meterToEdit.meterName"
                />
            </div>

            <div class="radio-group">
                <label for="type">Zählertyp: </label>
                <div style="display: flex; flex-direction: column; width: 100%">
                    <div class="radio-item">
                        <RadioButton
                            v-model="meterToEdit.type"
                            inputId="Strom"
                            name="tallyType"
                            value="Strom"
                        />
                        <label for="Strom" class="ml-2">Strom</label>
                    </div>

                    <div class="radio-item">
                        <RadioButton
                            v-model="meterToEdit.type"
                            inputId="Gas"
                            name="tallyType"
                            value="Gas"
                        />
                        <label for="Gas" class="ml-2">Gas</label>
                    </div>

                    <div class="radio-item">
                        <RadioButton
                            v-model="meterToEdit.type"
                            inputId="Wasser"
                            name="tallyType"
                            value="Wasser"
                        />
                        <label for="Wasser" class="ml-2">Wasser</label>
                    </div>

                    <div class="radio-item">
                        <RadioButton
                            v-model="meterToEdit.type"
                            inputId="Heizung"
                            name="tallyType"
                            value="Heizung"
                        />
                        <label for="Heizung" class="ml-2">Heizung</label>
                    </div>

                    <div class="radio-item">
                        <RadioButton
                            v-model="meterToEdit.type"
                            inputId="Sonstiges"
                            name="tallyType"
                            value="Sonstiges"
                        />
                        <label for="Sonstiges" class="ml-2">Sonstiges</label>
                    </div>
                </div>
            </div>
            <div class="button-group">
                <Button label="Abbrechen" class="p-button-secondary" @click="cancelChanges" />
                <Button
                    label="Änderung speichern"
                    icon="pi pi-save"
                    class="p-button-primary"
                    @click="saveChangesMeter"
                />
            </div>
        </template>
        <!-- Zählerstand bearbeiten -->
        <template class="meterReadingModal" v-else>
            <h3>Zähler: {{ meterToEdit.meterName }}</h3>
            <div class="input-group">
                <label for="name">Abgelesen von</label>
                <InputText
                    id="name"
                    v-model="readingToEdit.readerName"
                    placeholder="Max Mustermann"
                    :invalid="!meterStore.isValidName(readingToEdit.readerName)"
                />
            </div>
            <div class="input-group">
                <label for="Wert">Wert</label>
                <InputMask
                    id="value"
                    v-model="readingToEdit.value"
                    mask="99999.999"
                    placeholder="12345.678"
                    :invalid="!readingToEdit.value"
                />
            </div>
            <div class="input-group">
                <DatePicker
                    v-model="dateTemp"
                    id="date"
                    type="date"
                    showIcon
                    fluid
                    :showOnFocus="false"
                    :maxDate="MaxDate"
                    dateFormat="dd.mm.yy"
                    class="inputDate"
                />
            </div>
            <div class="button-group">
                <Button label="Abbrechen" class="p-button-secondary" @click="cancelChanges" />
                <Button
                    label="Änderung speichern"
                    icon="pi pi-save"
                    class="p-button-primary"
                    @click="saveChangesReading"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMeterStore } from "../stores/useMeterStore";
import { Meter, MeterReading } from "../types.ts";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import RadioButton from "primevue/radiobutton";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const meterStore = useMeterStore();

const isVisible = ref(false);
const meterToEdit = ref<Meter>({} as Meter);
const readingToEdit = ref<MeterReading>({} as MeterReading);
const isEditingReading = ref(false);
const dateTemp = ref(new Date());
const MaxDate = new Date();

watch(
    () => meterStore.meterToEdit,
    (newMeterEdit) => {
        if (newMeterEdit) {
            isVisible.value = true;
            meterToEdit.value = { ...newMeterEdit }; //creates copy
            if (meterStore.isEditingReading && meterStore.readingToEdit) {
                //for editing readings
                readingToEdit.value = { ...meterStore.readingToEdit };
                isEditingReading.value = true;
            }
        }
    }
);

function cancelChanges() {
    isVisible.value = false;
    isEditingReading.value = false;
    meterStore.closeModal();
}

function saveChangesMeter() {
    if (!meterToEdit.value.meterName || !meterToEdit.value.type) {
        alert("Bitte füllen Sie alle Zählerdaten aus.");
        return;
    }
    meterStore.saveChangesMeter(meterToEdit.value);
    isVisible.value = false;
}

function saveChangesReading() {
    if (
        !readingToEdit.value.readerName ||
        !readingToEdit.value.value ||
        !readingToEdit.value.date
    ) {
        alert("Bitte füllen Sie alle Zählerdaten aus.");
        return;
    }
    readingToEdit.value.readerName = meterStore.formatName(readingToEdit.value.readerName);
    readingToEdit.value.date = meterStore.formatDate(dateTemp.value);
    meterStore.saveChangesReading(meterToEdit.value, readingToEdit.value);
    isEditingReading.value = false;
    isVisible.value = false;
}
</script>

<style scoped>
.MeterModal {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.input-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}
.radio-group {
    display: flex;
    flex-direction: column;
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

.button-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
}

.inputDate {
    display: flex;
    margin-left: auto;
    margin-right: auto;
}
</style>
