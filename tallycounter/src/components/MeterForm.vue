<template>
    <div>
        <FloatLabel>
            <label for="name">Vorname, Nachname</label>
            <InputText type="text" id="name" v-model="name" placeholder="Max Mustermann" />
        </FloatLabel>

        <FloatLabel>
            <label for="nummer">Nummer</label>
            <InputText type="text" id="value" v-model="value" placeholder="12456.789" />
        </FloatLabel>

        <FloatLabel>
            <label for="date">Ablesedatum</label>
            <InputText type="date" id="date" v-model="date" placeholder="31.12.2024" :max="maxDate" />
        </FloatLabel>
    </div>
</template>

<script setup lang="ts">
// import { Meter, MeterReading, MeterType } from "../types";
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { ref } from 'vue';


const value = ref(null);
const name = ref("");
const date = ref("");


const today = new Date();
const maxDate = today.toISOString().split('T')[0];

</script>

<style scoped></style>
