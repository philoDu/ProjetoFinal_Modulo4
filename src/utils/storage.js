// Lê um valor do localStorage; se não existir ou estiver corrompido, usa o padrão
export function carregar(chave, padrao) {
  try {
    return JSON.parse(localStorage.getItem(chave)) ?? padrao
  } catch {
    return padrao
  }
}