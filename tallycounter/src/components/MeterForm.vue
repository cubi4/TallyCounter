<template>
    <div>
        <FloatLabel>
            <label for="name">Vorname, Nachname</label>
            <InputText type="text" id="name" v-model="name" placeholder="Max Mustermann" />
        </FloatLabel>

        <FloatLabel>
            <label for="nummer">Nummer</label>
            <InputMask id="value" v-model="value" mask="99999.999" placeholder="12456.789" />
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
                <RadioButton v-model="tallyType" inputId="Strom" name="tallyType" value="Strom" />
                <label for="Strom" class="ml-2">Strom</label>
            </div>

            <div class="radio-item">
                <RadioButton v-model="tallyType" inputId="Gas" name="tallyType" value="Gas" />
                <label for="Gas" class="ml-2">Gas</label>
            </div>

            <div class="radio-item">
                <RadioButton v-model="tallyType" inputId="Wasser" name="tallyType" value="Wasser" />
                <label for="Wasser" class="ml-2">Wasser</label>
            </div>

            <div class="radio-item">
                <RadioButton
                    v-model="tallyType"
                    inputId="Heizung"
                    name="tallyType"
                    value="Heizung"
                />
                <label for="Heizung" class="ml-2">Heizung</label>
            </div>

            <div class="radio-item">
                <RadioButton
                    v-model="tallyType"
                    inputId="Sonstiges"
                    name="tallyType"
                    value="Sonstiges"
                />
                <label for="Sonstiges" class="ml-2">Sonstiges</label>
            </div>
        </div>
        
        <Button label="Eingaben löschen" @click="resetForm" class="p-button-secondary"/>
        <Button label="Zähler hinzufügen" />

        {{ name }}
        {{ value }}
        {{ date }}
        {{ tallyType }}
    </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import InputMask from "primevue/inputmask";
import DatePicker from "primevue/datepicker";
import RadioButton from "primevue/radiobutton";
import Button from 'primevue/button';

import { ref } from "vue";

const value = ref(null);
const name = ref("");
const date = ref("");
const tallyType = ref("");

const today = new Date();
const maxDate = today.toISOString().split("T")[0];
const maxDateFormatted = maxDate.split("-").reverse().join(".");

function resetForm() {
  name.value = "";
  value.value = null;
  date.value = "";
  tallyType.value = "";
};
</script>

<style scoped></style>
