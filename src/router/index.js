import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TarefaDetalhesView from '@/views/TarefaDetalhesView.vue'
import TarefaNovaView from '@/views/TarefaNovaView.vue'
import TarefaEditarView from '@/views/TarefaEditarView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView, meta: { publica: true } },
    { path: '/cadastro', name: 'cadastro', component: CadastroView, meta: { publica: true } },
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/tarefas/nova', name: 'nova-tarefa', component: TarefaNovaView },
    { path: '/tarefas/:id', name: 'tarefa', component: TarefaDetalhesView },
    { path: '/tarefas/:id/editar', name: 'editar-tarefa', component: TarefaEditarView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  // Rota protegida sem login: manda para o login, lembrando o destino
  if (!to.meta.publica && !auth.estaLogado) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // Já logado tentando ver login ou cadastro: manda para o quadro
  if (to.meta.publica && auth.estaLogado) {
    return { name: 'dashboard' }
  }
})

export default router