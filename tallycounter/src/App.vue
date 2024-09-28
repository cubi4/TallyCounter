<script setup lang="ts">
import MeterOverview from "./components/MeterOverview.vue";
import MeterForm from "./components/MeterForm.vue";
</script>

<template>
    <div class="app">
        <MeterOverview class="MeterOverview" />
        <MeterForm class="MeterForm" />
    </div>
</template>

<style>
* {
    /* color: black; */
    /* background-color: #ffffff; */
    font-family: sans-serif;
}

.app {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;
    gap: 2rem;
    padding: 1rem 2rem 2rem 2rem;
}

.MeterOverview {
    flex: 1;
}

.MeterForm {
    flex: 1;
}
</style>
