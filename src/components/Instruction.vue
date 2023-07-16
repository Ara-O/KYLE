<template>
  <div class="flex items-center justify-start gap-5">
    <div
      class="bg-black border-2 max-w-[25px] min-w-[25px] border-tech-primary-1 h-6 rounded-full flex items-center justify-center"
    >
      <div
        class="w-2.5 h-2.5 border-[1.5px] border-tech-primary-2 rounded-full"
      ></div>
    </div>
    <h4 class="text-tech-primary-2 text-sm mt-[-5px]">
      <h4 class="tracking-wide text-[13.5px]">
        <slot></slot>
      </h4>
    </h4>
  </div>
</template>
