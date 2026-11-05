<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTarefasStore } from '@/stores/tarefas'
import TarefaForm from '@/components/TarefaForm.vue'

const route = useRoute()
const router = useRouter()
const tarefasStore = useTarefasStore()

const tarefa = computed(() => tarefasStore.buscarTarefaPorId(route.params.id))

function voltarParaDetalhes() {
  router.push({ name: 'tarefa', params: { id: tarefa.value.id } })
}

function salvar(dados) {
  tarefasStore.atualizarTarefa(tarefa.value.id, dados)
  voltarParaDetalhes()
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
    <div v-if="!tarefa" class="py-16 text-center">
      <h1 class="text-2xl font-bold">Tarefa não encontrada</h1>
      <RouterLink :to="{ name: 'dashboard' }" class="mt-6 inline-block font-semibold text-blue-600 hover:underline">
        Voltar ao quadro
      </RouterLink>
    </div>

    <template v-else>
      <h1 class="mb-6 text-2xl font-bold tracking-tight">Editar tarefa</h1>
      <TarefaForm
        :key="tarefa.id"
        :tarefa="tarefa"
        texto-botao="Salvar alterações"
        @salvar="salvar"
        @cancelar="voltarParaDetalhes"
      />
    </template>
  </div>
</template>