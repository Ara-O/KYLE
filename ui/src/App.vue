<template>
  <main class="bg-black h-screen w-screen flex items-start">
    <section
      class="flex items-center flex-col justify-start pr-16 pl-20 py-20 w-100 h-screen left-section"
    >
      <HeaderSection />
      <Chat @onAISpeak="kyleIsSpeaking" @stopKyle="stopKyle"/>
    </section>
    <section class="h-screen w-full">
      <canvas ref="canvasRef"></canvas>
    </section>
  </main>
</template>

<script setup lang="ts">
import {renderKyle, updateKyle, stopKyleMovement} from "./three-scripts/renderKyle";
import { ref, watchEffect } from "vue";
import Chat from "./components/Chat.vue";
import HeaderSection from "./components/Header.vue";

let canvasRef = ref<HTMLElement | null>(null);

function kyleIsSpeaking(){
  updateKyle()
}

function stopKyle(){
  stopKyleMovement()
}
watchEffect(() => {
  if (canvasRef.value) {
    renderKyle(canvasRef.value);
  }
});
</script>
