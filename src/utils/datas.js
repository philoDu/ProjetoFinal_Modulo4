// "2026-11-15" -> "15/11/2026"
export function formatarData(data) {
  if (!data) return ''
  return data.split('-').reverse().join('/')
}

// Data de hoje no fuso local, no formato "AAAA-MM-DD"
export function hojeISO() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function estaAtrasada(tarefa) {
  return tarefa.status !== 'concluida' && !!tarefa.dataEntrega && tarefa.dataEntrega < hojeISO()
}