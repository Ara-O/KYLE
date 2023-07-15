<template>
  <main class="bg-black h-screen w-screen flex items-start">
    <section
      class="flex items-center flex-col justify-start px-20 py-20 w-100 h-screen"
    >
      <h3 class="font-['Despairs'] text-tech-primary-1 text-5xl">KYLE</h3>
      <h5
        class="text-center mt-6 text-tech-primary-1 tracking-widest leading-8"
      >
        Meet KYLE. Your next AI Companion
      </h5>
    </section>
    <section class="bg-pink-300 h-screen w-full"></section>
    <!-- <canvas ref="canvasRef"></canvas> -->
  </main>
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
