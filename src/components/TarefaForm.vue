<script setup>
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTarefasStore } from '@/stores/tarefas'
import { STATUS, PRIORIDADES } from '@/utils/opcoes'

const props = defineProps({
  tarefa: { type: Object, default: null }, // null = criação; objeto = edição
  textoBotao: { type: String, default: 'Salvar' },
})
const emit = defineEmits(['salvar', 'cancelar'])

const auth = useAuthStore()
const tarefasStore = useTarefasStore()

// Cópia local dos dados: o store só muda quando o usuário confirmar
const form = reactive({
  titulo: props.tarefa?.titulo ?? '',
  descricao: props.tarefa?.descricao ?? '',
  status: props.tarefa?.status ?? 'a-fazer',
  prioridade: props.tarefa?.prioridade ?? 'media',
  responsaveis: [...(props.tarefa?.responsaveis ?? [])],
  dataInicio: props.tarefa?.dataInicio ?? '',
  dataEntrega: props.tarefa?.dataEntrega ?? '',
  vinculadas: [...(props.tarefa?.vinculadas ?? [])],
})

const erro = ref('')

// Uma tarefa não pode ser vinculada a ela mesma
const tarefasDisponiveis = computed(() =>
  tarefasStore.tarefas.filter((t) => t.id !== props.tarefa?.id),
)

function enviar() {
  erro.value = ''
  if (form.dataInicio && form.dataEntrega && form.dataEntrega < form.dataInicio) {
    erro.value = 'A data de entrega não pode ser anterior à data de início.'
    return
  }
  emit('salvar', {
    ...form,
    titulo: form.titulo.trim(),
    descricao: form.descricao.trim(),
    responsaveis: [...form.responsaveis],
    vinculadas: [...form.vinculadas],
  })
}
</script>

<template>
  <form class="space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6" @submit.prevent="enviar">
    <p v-if="erro" role="alert" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {{ erro }}
    </p>

    <div>
      <label for="titulo" class="rotulo">Título <span class="text-red-600" aria-hidden="true">*</span></label>
      <input id="titulo" v-model="form.titulo" type="text" required maxlength="120" class="campo" />
    </div>

    <div>
      <label for="descricao" class="rotulo">Descrição</label>
      <textarea id="descricao" v-model="form.descricao" rows="5" class="campo resize-y"></textarea>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <div>
        <label for="status" class="rotulo">Status</label>
        <select id="status" v-model="form.status" class="campo">
          <option v-for="s in STATUS" :key="s.valor" :value="s.valor">{{ s.rotulo }}</option>
        </select>
      </div>
      <div>
        <label for="prioridade" class="rotulo">Prioridade</label>
        <select id="prioridade" v-model="form.prioridade" class="campo">
          <option v-for="p in PRIORIDADES" :key="p.valor" :value="p.valor">{{ p.rotulo }}</option>
        </select>
      </div>
      <div>
        <label for="data-inicio" class="rotulo">Data de início</label>
        <input id="data-inicio" v-model="form.dataInicio" type="date" class="campo" />
      </div>
      <div>
        <label for="data-entrega" class="rotulo">Data de entrega</label>
        <input id="data-entrega" v-model="form.dataEntrega" type="date" :min="form.dataInicio || undefined" class="campo" />
      </div>
    </div>

    <fieldset>
      <legend class="rotulo">Responsáveis</legend>
      <div class="grid gap-2 sm:grid-cols-2">
        <label
          v-for="u in auth.usuarios"
          :key="u.id"
          class="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm transition-colors hover:bg-slate-50 has-[:checked]:border-blue-300 has-[:checked]:bg-blue-50"
        >
          <input v-model="form.responsaveis" type="checkbox" :value="u.id" class="size-4 accent-blue-600" />
          {{ u.nome }}
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend class="rotulo">Tarefas vinculadas</legend>
      <div v-if="tarefasDisponiveis.length" class="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
        <label
          v-for="t in tarefasDisponiveis"
          :key="t.id"
          class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-slate-50"
        >
          <input v-model="form.vinculadas" type="checkbox" :value="t.id" class="size-4 accent-blue-600" />
          {{ t.titulo }}
        </label>
      </div>
      <p v-else class="text-sm italic text-slate-400">Não há outras tarefas para vincular.</p>
    </fieldset>

    <div class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
      <button
        type="button"
        class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        @click="emit('cancelar')"
      >
        Cancelar
      </button>
      <button type="submit" class="botao-primario sm:w-auto">{{ textoBotao }}</button>
    </div>
  </form>
</template>