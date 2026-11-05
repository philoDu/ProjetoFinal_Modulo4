import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { carregar } from '@/utils/storage'

// Usuários de exemplo, para testar o login e escolher responsáveis nas tarefas
const usuariosIniciais = [
  { id: 'u1', nome: 'Ana Souza', email: 'ana@exemplo.com', senha: '123456' },
  { id: 'u2', nome: 'Bruno Lima', email: 'bruno@exemplo.com', senha: '123456' },
  { id: 'u3', nome: 'Carla Dias', email: 'carla@exemplo.com', senha: '123456' },
  { id: 'u4', nome: 'Alexandre', email: 'alexandre@exemplo.com', senha: '123456' },
]

export const useAuthStore = defineStore('auth', () => {
    // --- state ---
    const usuarios = ref(carregar('usuarios', usuariosIniciais))
    const usuarioLogado = ref(carregar('usuarioLogado', null))

    // --- getters ---
    const estaLogado = computed(() => usuarioLogado.value !== null)

    // --- actions ---
    function cadastrar({ nome, email, senha}) {
        const emailNormalizado = email.trim().toLowerCase()
        if (usuarios.value.some((u) => u.email === emailNormalizado)) {
            throw new Error('Já existe uma conta com este e-mail.');
        }
        const novo = { id: crypto.randomUUID(), nome: nome.trim(), email: emailNormalizado, senha }
        usuarios.value.push(novo)
        usuarioLogado.value = { id: novo.id, nome: novo.nome, email: novo.email }
    }

    function login(email, senha) {
        const usuario = usuarios.value.find(
            (u) => u.email === email.trim().toLowerCase() && u.senha === senha,
        )
        if (!usuario) {
            throw new Error('E-mail ou senha incorretos.')
        }
        usuarioLogado.value = { id: usuario.id, nome: usuario.nome, email: usuario.email }
    }

    function logout() {
        usuarioLogado.value = null
    }

    // --- persistência: toda mudança é salva no localStorage ---
    watch(usuarios, (valor) => localStorage.setItem('usuarios', JSON.stringify(valor)), { deep: true })
    watch(usuarioLogado, (valor) => localStorage.setItem('usuarioLogado', JSON.stringify(valor)))

    return { usuarios, usuarioLogado, estaLogado, cadastrar, login, logout }
})