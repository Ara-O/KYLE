<template>
  <main class="bg-black h-screen w-screen flex items-start">
    <section
      class="flex items-center flex-col justify-start pr-16 pl-20 py-20 w-100 h-screen"
    >
      <h3 class="font-['Despairs'] text-tech-primary-1 text-5xl">KYLE</h3>
      <h5
        class="text-center mt-6 text-tech-primary-1 tracking-widest leading-8 text-sm"
      >
        Meet KYLE. Your next AI Companion
      </h5>

      <!-- Dashed border -->
      <div
        class="border mt-10 border-tech-primary-1 border-dashed relative dashed-line"
      ></div>

      <article class="mt-7 h-96 w-full flex flex-col gap-3">
        <Instruction> Kyle is visualized on the right</Instruction>
        <Instruction>Potato</Instruction>
      </article>
    </section>
    <section class="h-screen w-full">
      <canvas ref="canvasRef"></canvas>
    </section>
  </main>
</template>

<script setup lang="ts">
import renderKyle from "./three-scripts/renderKyle";
import { ref, watchEffect } from "vue";
import Instruction from "./components/Instruction.vue";

let canvasRef = ref<HTMLElement | null>(null);

watchEffect(() => {
  if (canvasRef.value) {
    renderKyle(canvasRef.value);
  }
});
</script>
