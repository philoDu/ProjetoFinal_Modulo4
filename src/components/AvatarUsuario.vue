<script setup>
import { computed } from 'vue'

const props = defineProps({
  nome: { type: String, required: true },
})

const iniciais = computed(() =>
  props.nome
    .split(' ')
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <span
    class="grid size-7 place-items-center rounded-full bg-slate-200 text-[0.65rem] font-semibold text-slate-700 ring-2 ring-white"
    :title="nome"
  >
    <span aria-hidden="true">{{ iniciais }}</span>
    <span class="sr-only">{{ nome }}</span>
  </span>
</template>