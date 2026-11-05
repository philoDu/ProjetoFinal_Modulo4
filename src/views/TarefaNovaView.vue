<script setup>
import { useRouter } from 'vue-router'
import { useTarefasStore } from '@/stores/tarefas'
import TarefaForm from '@/components/TarefaForm.vue'

const router = useRouter()
const tarefasStore = useTarefasStore()

function criar(dados) {
  const nova = tarefasStore.adicionarTarefa(dados)
  router.push({ name: 'tarefa', params: { id: nova.id } })
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
    <h1 class="mb-6 text-2xl font-bold tracking-tight">Nova tarefa</h1>
    <TarefaForm texto-botao="Criar tarefa" @salvar="criar" @cancelar="router.push({ name: 'dashboard' })" />
  </div>
</template>