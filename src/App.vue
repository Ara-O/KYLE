<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import renderKyle from "./three-scripts/renderKyle";
import { ref, watchEffect } from "vue";

let canvasRef = ref<HTMLElement | null>(null);

watchEffect(() => {
  if (canvasRef.value) {
    renderKyle(canvasRef.value);
  }
});
</script>
