import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { carregar } from '@/utils/storage'

// Tarefas de exemplo, usadas só quando o localStorage ainda está vazio
const tarefasIniciais = [
  {
    id: 't1',
    titulo: 'Criar tela de login',
    descricao: 'Desenvolver a interface de autenticação do sistema.',
    status: 'a-fazer',
    prioridade: 'alta',
    responsaveis: ['u1'],
    dataInicio: '2026-11-10',
    dataEntrega: '2026-11-15',
    vinculadas: ['t2'],
    criadoEm: '2026-11-05T10:00:00.000Z',
  },
  {
    id: 't2',
    titulo: 'Implementar autenticação',
    descricao: 'Implementar validação de credenciais e autenticação.',
    status: 'em-andamento',
    prioridade: 'critica',
    responsaveis: ['u2'],
    dataInicio: '2026-11-11',
    dataEntrega: '2026-11-18',
    vinculadas: [],
    criadoEm: '2026-11-05T10:05:00.000Z',
  },
  {
    id: 't3',
    titulo: 'Criar painel principal',
    descricao: 'Desenvolver o dashboard inicial da aplicação.',
    status: 'em-revisao',
    prioridade: 'media',
    responsaveis: ['u1', 'u2'],
    dataInicio: '2026-11-12',
    dataEntrega: '2026-11-20',
    vinculadas: ['t1'],
    criadoEm: '2026-11-05T10:10:00.000Z',
  },
  {
    id: 't4',
    titulo: 'Documentar API',
    descricao: 'Documentar os endpoints e exemplos de utilização.',
    status: 'concluida',
    prioridade: 'baixa',
    responsaveis: ['u3'],
    dataInicio: '2026-11-05',
    dataEntrega: '2026-11-09',
    vinculadas: [],
    criadoEm: '2026-11-05T10:15:00.000Z',
  },
]

export const useTarefasStore = defineStore('tarefas', () => {
  // --- state ---
  const tarefas = ref(carregar('tarefas', tarefasIniciais))

  // --- getters ---
  const porStatus = computed(() => ({
    'a-fazer': tarefas.value.filter((t) => t.status === 'a-fazer'),
    'em-andamento': tarefas.value.filter((t) => t.status === 'em-andamento'),
    'em-revisao': tarefas.value.filter((t) => t.status === 'em-revisao'),
    concluida: tarefas.value.filter((t) => t.status === 'concluida'),
  }))

  // --- actions ---
  function adicionarTarefa(novaTarefa) {
    const tarefa = {
      ...novaTarefa,
      id: `t${Date.now()}`,
      criadoEm: new Date().toISOString(),
    }
    tarefas.value.push(tarefa)
    return tarefa
  }

  function buscarTarefaPorId(id) {
    return tarefas.value.find((tarefa) => tarefa.id === id)
  }

  function removerTarefa(id) {
    tarefas.value = tarefas.value
      .filter((tarefa) => tarefa.id !== id)
      .map((tarefa) => ({
        ...tarefa,
        vinculadas: tarefa.vinculadas.filter((v) => v !== id),
      }))
  }

  function atualizarTarefa(id, dadosAtualizados) {
    const index = tarefas.value.findIndex((tarefa) => tarefa.id === id)
    if (index !== -1) {
      tarefas.value[index] = {
        ...tarefas.value[index],
        ...dadosAtualizados,
        id, // garante que o id nunca seja sobrescrito
      }
    }
  }

  // --- persistência ---
  watch(tarefas, (valor) => localStorage.setItem('tarefas', JSON.stringify(valor)), { deep: true })

  return {
    tarefas,
    porStatus,
    adicionarTarefa,
    buscarTarefaPorId,
    removerTarefa,
    atualizarTarefa,
  }
})