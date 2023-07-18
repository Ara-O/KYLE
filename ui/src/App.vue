<template>
  <main class="bg-black h-screen w-screen flex items-start">
    <section
      class="flex items-center flex-col justify-start pr-16 pl-20 py-20 w-100 h-screen left-section"
    >
      <Header />

      <!-- Chat Section -->
      <article class="mt-7 w-full flex flex-col gap-3 relative h-full">
        <Instruction> Kyle is visualized on the right</Instruction>
        <Instruction
          >His color changes based on sentiment towards your
          message</Instruction
        >

        <!-- CHAT -->
        <h3 class="text-center mt-10 mb-5 text-tech-primary-1">Messages</h3>
        <article class="h-80 overflow-auto">
          <div
            class="border h-auto message-container mb-4 px-6 py-3 text-[12px] pb-[17px] text-tech-primary-2 tracking-wider"
            :class="{
              '!border-[#c9c5a3] !text-[#c9c5a3]': message.sender !== 'User',
            }"
            v-for="message in chatMessages"
          >
            <h4>{{ message.text }}</h4>
          </div>
        </article>

        <form
          class="flex absolute bottom-1 w-full gap-3"
          @submit.prevent="sendMessage"
        >
          <input
            type="text"
            v-model="userMessage"
            class="w-full border color text-tech-primary-2 bg-black border-black outline-none border-b-tech-primary-1"
          />
          <button class="pointer hover:rotate-180 transition-all" type="submit">
            <img src="/button.png" class="w-10" alt="Button" />
          </button>
        </form>
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
import Header from "./components/Header.vue";

let canvasRef = ref<HTMLElement | null>(null);
let userMessage = ref<string>("");
let chatMessages = ref([
  {
    sender: "User",
    text: "Hello ",
  },
]);

function sendMessage() {
  chatMessages.value.push({ sender: "User", text: userMessage.value });
  userMessage.value = "";
}

watchEffect(() => {
  if (canvasRef.value) {
    renderKyle(canvasRef.value);
  }
});
</script>
