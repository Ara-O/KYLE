<template>
    <article class="mt-7 w-full flex flex-col gap-3 relative h-full">
        <Instruction> Kyle is visualized on the right</Instruction>
        <Instruction
          >His color changes based on sentiment towards your
          message</Instruction
        >

        <!-- CHAT -->
        <h3 class="text-center mt-10 mb-5 text-tech-primary-1">Messages</h3>
        <article ref="messagesContainer" class="h-72 overflow-auto messages-box" style="overflow-anchor: auto;">
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
          <button class="pointer hover:rotate-180 transition-all" :class="{' animate-spin':aiIsThinking}" type="submit">
            <img src="/button.png" class="w-10" alt="Button" />
          </button>
        </form>
      </article>
</template>

<script setup lang="ts">
import axios from "axios"
import { ref, nextTick } from 'vue';
import Instruction from './Instruction.vue';
let userMessage = ref<string>("");
let aiIsThinking = ref<boolean>(false)
const emits = defineEmits(["onAISpeak", "stopKyle"])

type Chat = {
  role: string,
  content: string
}

let messagesContainer = ref<HTMLElement | null>(null)

let chatMessages = ref<Chat[]>([]);
  
  async function sendMessage() {
    chatMessages.value.push({ role: "user", content: userMessage.value });
    nextTick(()=> {
      if(messagesContainer.value){
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight 
      }
    })

    userMessage.value = "";

    aiIsThinking.value = true
    let res = await axios.post("https://kyle-jfu0.onrender.com/sendMessage", chatMessages.value)
    aiIsThinking.value = false
    
    chatMessages.value.push({
      role: "assistant",
      content: res.data
    })

    nextTick(()=> {
      if(messagesContainer.value){
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight 
      }
    })

    emits("onAISpeak")
    var speech = new SpeechSynthesisUtterance();
    speech.text = res.data;

    speech.addEventListener('end', () => {
       emits("stopKyle");
      });

    window.speechSynthesis.speak(speech)
}


</script>