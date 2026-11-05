<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTarefasStore } from '@/stores/tarefas'
import { STATUS, buscarOpcao } from '@/utils/opcoes'
import { formatarData, estaAtrasada } from '@/utils/datas'
import BadgePrioridade from '@/components/BadgePrioridade.vue'
import AvatarUsuario from '@/components/AvatarUsuario.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const tarefasStore = useTarefasStore()

// computed: ao navegar de uma tarefa vinculada para outra, a view é reaproveitada
const tarefa = computed(() => tarefasStore.buscarTarefaPorId(route.params.id))

const responsaveis = computed(() =>
  tarefa.value.responsaveis.map((id) => auth.usuarios.find((u) => u.id === id)).filter(Boolean),
)

const vinculadas = computed(() =>
  tarefa.value.vinculadas.map((id) => tarefasStore.buscarTarefaPorId(id)).filter(Boolean),
)

const atrasada = computed(() => estaAtrasada(tarefa.value))

const criadoEm = computed(() =>
  new Date(tarefa.value.criadoEm).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
)

function rotuloStatus(valor) {
  return buscarOpcao(STATUS, valor)?.rotulo ?? valor
}

function corStatus(valor) {
  return buscarOpcao(STATUS, valor)?.cor ?? 'bg-slate-400'
}

function mudarStatus(evento) {
  tarefasStore.atualizarTarefa(tarefa.value.id, { status: evento.target.value })
}

function excluir() {
  if (confirm(`Excluir a tarefa "${tarefa.value.titulo}"? Esta ação não pode ser desfeita.`)) {
    tarefasStore.removerTarefa(tarefa.value.id)
    router.push({ name: 'dashboard' })
  }
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
    <!-- Tarefa inexistente -->
    <div v-if="!tarefa" class="py-16 text-center">
      <h1 class="text-2xl font-bold">Tarefa não encontrada</h1>
      <p class="mt-2 text-slate-600">Ela pode ter sido excluída ou o endereço está incorreto.</p>
      <RouterLink :to="{ name: 'dashboard' }" class="mt-6 inline-block font-semibold text-blue-600 hover:underline">
        Voltar ao quadro
      </RouterLink>
    </div>

    <template v-else>
      <!-- Trilha de navegação -->
      <nav aria-label="Trilha de navegação" class="mb-4 text-sm text-slate-500">
        <RouterLink :to="{ name: 'dashboard' }" class="hover:text-blue-600 hover:underline">Quadro</RouterLink>
        <span aria-hidden="true" class="mx-2">/</span>
        <span aria-current="page">{{ tarefa.id }}</span>
      </nav>

      <!-- Título e ações -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 class="text-2xl font-bold tracking-tight md:text-3xl">{{ tarefa.titulo }}</h1>
        <div class="flex shrink-0 gap-2">
          <RouterLink
            :to="{ name: 'editar-tarefa', params: { id: tarefa.id } }"
            class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            Editar
          </RouterLink>
          <button
            type="button"
            class="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition-colors hover:bg-red-50"
            @click="excluir"
          >
            Excluir
          </button>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Conteúdo principal -->
        <div class="space-y-6 lg:col-span-2">
          <section aria-labelledby="titulo-descricao" class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 id="titulo-descricao" class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Descrição
            </h2>
            <p v-if="tarefa.descricao" class="whitespace-pre-line leading-relaxed text-slate-700">
              {{ tarefa.descricao }}
            </p>
            <p v-else class="italic text-slate-400">Sem descrição.</p>
          </section>

          <section aria-labelledby="titulo-vinculadas" class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 id="titulo-vinculadas" class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Tarefas vinculadas
            </h2>
            <ul v-if="vinculadas.length" class="divide-y divide-slate-100">
              <li v-for="v in vinculadas" :key="v.id">
                <RouterLink
                  :to="{ name: 'tarefa', params: { id: v.id } }"
                  class="-mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-slate-50"
                >
                  <span class="font-medium text-slate-800">{{ v.titulo }}</span>
                  <span class="inline-flex shrink-0 items-center gap-1.5 text-xs text-slate-600">
                    <span class="size-2 rounded-full" :class="corStatus(v.status)" aria-hidden="true"></span>
                    {{ rotuloStatus(v.status) }}
                  </span>
                </RouterLink>
              </li>
            </ul>
            <p v-else class="italic text-slate-400">Nenhuma tarefa vinculada.</p>
          </section>
        </div>

        <!-- Painel de detalhes -->
        <aside aria-labelledby="titulo-detalhes" class="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 id="titulo-detalhes" class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Detalhes
          </h2>
          <dl class="space-y-5 text-sm">
            <div>
              <dt class="rotulo">
                <label for="status">Status</label>
              </dt>
              <dd>
                <select id="status" :value="tarefa.status" class="campo" @change="mudarStatus">
                  <option v-for="s in STATUS" :key="s.valor" :value="s.valor">{{ s.rotulo }}</option>
                </select>
              </dd>
            </div>

            <div>
              <dt class="rotulo">Prioridade</dt>
              <dd><BadgePrioridade :prioridade="tarefa.prioridade" /></dd>
            </div>

            <div>
              <dt class="rotulo">Responsáveis</dt>
              <dd>
                <ul v-if="responsaveis.length" class="space-y-2">
                  <li v-for="u in responsaveis" :key="u.id" class="flex items-center gap-2">
                    <AvatarUsuario :nome="u.nome" />
                    <span class="text-slate-800">{{ u.nome }}</span>
                  </li>
                </ul>
                <span v-else class="italic text-slate-400">Ninguém atribuído</span>
              </dd>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <dt class="rotulo">Início</dt>
                <dd class="text-slate-800">{{ formatarData(tarefa.dataInicio) || '—' }}</dd>
              </div>
              <div>
                <dt class="rotulo">Entrega</dt>
                <dd :class="atrasada ? 'font-semibold text-red-600' : 'text-slate-800'">
                  {{ formatarData(tarefa.dataEntrega) || '—' }}
                  <span v-if="atrasada" class="block text-xs">Atrasada</span>
                </dd>
              </div>
            </div>

            <div class="border-t border-slate-100 pt-4 text-xs text-slate-500">
              Criada em {{ criadoEm }}
            </div>
          </dl>
        </aside>
      </div>
    </template>
  </div>
</template>