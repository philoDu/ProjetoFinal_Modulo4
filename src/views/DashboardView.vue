<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTarefasStore } from '@/stores/tarefas'
import { STATUS } from '@/utils/opcoes'
import TarefaCard from '@/components/TarefaCard.vue'

const auth = useAuthStore()
const tarefasStore = useTarefasStore()

const busca = ref('')
const soMinhas = ref(false)

const tarefasFiltradas = computed(() => {
  const termo = busca.value.trim().toLowerCase()
  return tarefasStore.tarefas.filter((t) => {
    const casaBusca = !termo || t.titulo.toLowerCase().includes(termo)
    const casaResponsavel = !soMinhas.value || t.responsaveis.includes(auth.usuarioLogado.id)
    return casaBusca && casaResponsavel
  })
})

// Uma coluna por status, cada uma com as suas tarefas
const colunas = computed(() =>
  STATUS.map((status) => ({
    ...status,
    tarefas: tarefasFiltradas.value.filter((t) => t.status === status.valor),
  })),
)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Quadro de tarefas</h1>
        <p class="mt-1 text-sm text-slate-600">{{ tarefasFiltradas.length }} tarefa(s) exibida(s)</p>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label for="busca" class="sr-only">Buscar tarefas</label>
        <input id="busca" v-model="busca" type="search" placeholder="Buscar por título..." class="campo sm:w-64" />

        <label class="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <input v-model="soMinhas" type="checkbox" class="size-4 rounded accent-blue-600" />
          Só minhas tarefas
        </label>
      </div>
    </div>

    <!-- No celular: colunas roláveis na horizontal. Em telas grandes: grade de 4 colunas -->
    <div
      class="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
    >
      <section
        v-for="coluna in colunas"
        :key="coluna.valor"
        :aria-labelledby="`coluna-${coluna.valor}`"
        class="flex w-[85%] shrink-0 snap-start flex-col rounded-xl bg-slate-100 p-3 sm:w-80 lg:w-auto"
      >
        <h2 :id="`coluna-${coluna.valor}`" class="mb-3 flex items-center gap-2 px-1 text-sm font-semibold text-slate-700">
          <span class="size-2.5 rounded-full" :class="coluna.cor" aria-hidden="true"></span>
          {{ coluna.rotulo }}
          <span class="ml-auto rounded-full bg-white px-2 py-0.5 text-xs text-slate-500">
            {{ coluna.tarefas.length }}
          </span>
        </h2>

        <ul v-if="coluna.tarefas.length" class="flex flex-col gap-3">
          <li v-for="tarefa in coluna.tarefas" :key="tarefa.id">
            <TarefaCard :tarefa="tarefa" />
          </li>
        </ul>
        <p v-else class="rounded-lg border-2 border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
          Nenhuma tarefa
        </p>
      </section>
    </div>
  </div>
</template>