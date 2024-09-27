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

<style scoped>
.app {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;
}

.MeterOverview {
    flex: 1;
}

.MeterForm {
    flex: 1;
}
</style>
