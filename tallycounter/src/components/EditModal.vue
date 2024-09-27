<template>
    <Dialog
        v-model:visible="isVisible"
        header="Zähler bearbeiten"
        :modal="true"
        :closable="false"
        :style="{ width: '30rem' }"
    >
        <template v-if="!isEditingReading">
            <label for="nummer">Zählernummer</label>
            <InputMask
                id="nummer"
                v-model="meterToEdit.meterName"
                mask="99999999"
                placeholder="12345678"
            />
            <label for="type">Zählertyp</label>
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
            <Button label="Abbrechen" class="p-button-secondary" @click="cancelChanges" />
            <Button
                label="Änderung speichern"
                icon="pi pi-save"
                class="p-button-primary"
                @click="saveChanges"
            />
        </template>
        <!-- Zählerstand bearbeiten -->
        <template v-else>
            <h1>Zählerstand bearbeiten</h1>
            <h2>Für Zähler {{ meterToEdit.meterName }}</h2>
            <label for="name">Abgelesen von</label>
            <InputText id="name" v-model="readingToEdit.readerName" placeholder="Max Mustermann" />
            <label for="Wert">Wert</label>
            <InputMask
                id="value"
                v-model="readingToEdit.value"
                mask="99999.999"
                placeholder="12345.678"
            />
            <Button label="Abbrechen" class="p-button-secondary" @click="cancelChanges" />
            <Button
                label="Änderung speichern"
                icon="pi pi-save"
                class="p-button-primary"
                @click="saveChangesReading"
            />
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
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const meterStore = useMeterStore();

const isVisible = ref(false);
const meterToEdit = ref<Meter>({} as Meter);
const readingToEdit = ref<MeterReading>({} as MeterReading);
const isEditingReading = ref(false);

watch(
    () => meterStore.meterToEdit,
    (newMeterEdit) => {
        if (newMeterEdit) {
            isVisible.value = true;
            meterToEdit.value = newMeterEdit;
            if (meterStore.isEditingReading && meterStore.readingToEdit) {
                //for editing readings
                readingToEdit.value = meterStore.readingToEdit;
                isEditingReading.value = true;
                console.log("hallo", meterStore.isEditingReading, readingToEdit.value);
            }
        }
    }
);

function cancelChanges() {
    isVisible.value = false;
    isEditingReading.value = false;
    meterStore.closeModalAsMeter();
}

function saveChanges() {
    meterStore.saveChangesMeter(meterToEdit.value);
    isVisible.value = false;
}

function saveChangesReading() {
    meterStore.saveChangesReading(meterToEdit.value, readingToEdit.value);
    isVisible.value = false;
}
</script>

<style scoped></style>
