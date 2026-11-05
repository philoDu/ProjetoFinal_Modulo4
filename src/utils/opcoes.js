export const STATUS = [
  { valor: 'a-fazer', rotulo: 'A fazer', cor: 'bg-slate-400' },
  { valor: 'em-andamento', rotulo: 'Em andamento', cor: 'bg-blue-500' },
  { valor: 'em-revisao', rotulo: 'Em revisão', cor: 'bg-amber-500' },
  { valor: 'concluida', rotulo: 'Concluída', cor: 'bg-emerald-500' },
]

export const PRIORIDADES = [
  { valor: 'baixa', rotulo: 'Baixa', classes: 'bg-slate-100 text-slate-700' },
  { valor: 'media', rotulo: 'Média', classes: 'bg-sky-100 text-sky-800' },
  { valor: 'alta', rotulo: 'Alta', classes: 'bg-orange-100 text-orange-800' },
  { valor: 'critica', rotulo: 'Crítica', classes: 'bg-red-100 text-red-800' },
]

export function buscarOpcao(lista, valor) {
  return lista.find((opcao) => opcao.valor === valor)
}