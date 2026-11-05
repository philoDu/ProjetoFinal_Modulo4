<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatarData, estaAtrasada } from '@/utils/datas'
import BadgePrioridade from './BadgePrioridade.vue'
import AvatarUsuario from './AvatarUsuario.vue'

const props = defineProps({
  tarefa: { type: Object, required: true },
})

const auth = useAuthStore()

// Converte os ids dos responsáveis em objetos de usuário
const responsaveis = computed(() =>
  props.tarefa.responsaveis
    .map((id) => auth.usuarios.find((u) => u.id === id))
    .filter(Boolean),
)

const atrasada = computed(() => estaAtrasada(props.tarefa))
</script>

<template>
  <article
    class="relative rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
  >
    <div class="mb-3 flex items-start justify-between gap-2">
      <h3 class="font-medium leading-snug text-slate-900">
        <!-- O "after:" estica a área clicável do link pelo card inteiro -->
        <RouterLink
          :to="{ name: 'tarefa', params: { id: tarefa.id } }"
          class="after:absolute after:inset-0 after:rounded-lg focus:outline-none"
        >
          {{ tarefa.titulo }}
        </RouterLink>
      </h3>
      <BadgePrioridade :prioridade="tarefa.prioridade" class="shrink-0" />
    </div>

    <div class="flex items-center justify-between gap-2 text-xs text-slate-500">
      <span
        v-if="tarefa.dataEntrega"
        class="inline-flex items-center gap-1"
        :class="{ 'font-semibold text-red-600': atrasada }"
      >
        <span aria-hidden="true">📅</span>
        <span class="sr-only">Entrega:</span>
        {{ formatarData(tarefa.dataEntrega) }}
        <span v-if="atrasada">(atrasada)</span>
      </span>

      <div class="flex items-center gap-3">
        <span v-if="tarefa.vinculadas.length" class="inline-flex items-center gap-1">
          <span aria-hidden="true">🔗</span>
          {{ tarefa.vinculadas.length }}
          <span class="sr-only">tarefas vinculadas</span>
        </span>
        <div class="flex -space-x-2">
          <AvatarUsuario v-for="usuario in responsaveis" :key="usuario.id" :nome="usuario.nome" />
        </div>
      </div>
    </div>
  </article>
</template>