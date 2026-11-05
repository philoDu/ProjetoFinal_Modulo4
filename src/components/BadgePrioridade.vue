<script setup>
import { computed } from 'vue'
import { PRIORIDADES, buscarOpcao } from '@/utils/opcoes'

const props = defineProps({
  prioridade: { type: String, required: true },
})

const opcao = computed(() => buscarOpcao(PRIORIDADES, props.prioridade))
</script>

<template>
  <span
    v-if="opcao"
    class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
    :class="opcao.classes"
  >
    {{ opcao.rotulo }}
  </span>
</template>