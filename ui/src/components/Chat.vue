<template>
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
              '!border-[#c9c5a3] !text-[#c9c5a3]': message.role !== 'user',
            }"
            v-for="message in chatMessages"
          >
            <h4>{{ message.content }}</h4>
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
</template>

<script setup lang="ts">
import axios from "axios"
import { ref } from 'vue';
import Instruction from './Instruction.vue';
let userMessage = ref<string>("");

type Chat = {
  role: string,
  content: string
}

let chatMessages = ref<Chat[]>([
  {
    role: "user",
    content: "Hello ",
  },
]);

async function sendMessage() {
  chatMessages.value.push({ role: "user", content: userMessage.value });
  userMessage.value = "";
  let res = await axios.post("http://localhost:8080/sendMessage", chatMessages.value)
  chatMessages.value.push({
    role: "assistant",
    content: res.data
  })
  console.log(res)
}
</script>