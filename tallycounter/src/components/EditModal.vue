<template>
    <Dialog
        v-model:visible="isVisible"
        header="Zähler bearbeiten"
        :modal="true"
        :closable="false"
        :style="{ width: '30rem' }"
    >
        <label for="nummer">Zählernummer</label>
        <InputMask id="nummer" v-model="meterToEdit.meterName" mask="99999999" placeholder="12345678"/>
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
        <Button label="Änderung speichern" icon="pi pi-save" class="p-button-primary" @click="saveChanges" />
    </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMeterStore } from "../stores/useMeterStore";
import { Meter } from "../types.ts";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Dialog from "primevue/dialog";


// Pinia Store verwenden
const meterStore = useMeterStore();

const isVisible = ref(false);
const meterToEdit = ref<Meter>({} as Meter);

watch(
    () => meterStore.meterToEdit,
    (newMeterEdit) => {
        if (newMeterEdit) {
            isVisible.value = true;
            meterToEdit.value = newMeterEdit;
        }
    }
);

function cancelChanges() {
    isVisible.value = false;
    meterStore.closeModal();
}

function saveChanges() {
    meterStore.saveChanges(meterToEdit.value);
    isVisible.value = false;
}
</script>

<style scoped></style>
