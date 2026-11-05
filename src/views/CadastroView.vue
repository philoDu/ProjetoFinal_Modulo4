<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AuthLayout from "@/components/AuthLayout.vue";

const auth = useAuthStore();
const router = useRouter();

const nome = ref("");
const email = ref("");
const senha = ref("");
const confirmacao = ref("");
const erro = ref("");

function cadastrar() {
  erro.value = "";
  if (senha.value !== confirmacao.value) {
    erro.value = "As senhas não conferem.";
    return;
  }
  try {
    auth.cadastrar({
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    });
    router.push({ name: "dashboard" });
  } catch (e) {
    erro.value = e.message;
  }
}
</script>

<template>
  <AuthLayout
    titulo="Criar conta"
    subtitulo="Comece a organizar suas tarefas em minutos."
  >
    <form class="space-y-5" @submit.prevent="cadastrar">
      <p
        v-if="erro"
        role="alert"
        class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
      >
        {{ erro }}
      </p>

      <div>
        <label for="nome" class="rotulo">Nome completo</label>
        <input
          id="nome"
          v-model="nome"
          type="text"
          autocomplete="name"
          required
          class="campo"
        />
      </div>

      <div>
        <label for="email" class="rotulo">E-mail</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          class="campo"
          placeholder="voce@exemplo.com"
        />
      </div>

      <div>
        <label for="senha" class="rotulo">Senha</label>
        <input
          id="senha"
          v-model="senha"
          type="password"
          autocomplete="new-password"
          minlength="6"
          required
          class="campo"
          aria-describedby="senha-dica"
        />
        <p id="senha-dica" class="mt-1.5 text-xs text-slate-500">
          Mínimo de 6 caracteres.
        </p>
      </div>

      <div>
        <label for="confirmacao" class="rotulo">Confirmar senha</label>
        <input
          id="confirmacao"
          v-model="confirmacao"
          type="password"
          autocomplete="new-password"
          required
          class="campo"
        />
      </div>

      <button type="submit" class="botao-primario">Criar conta</button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-600">
      Já tem uma conta?
      <RouterLink
        :to="{ name: 'login' }"
        class="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
      >
        Entrar
      </RouterLink>
    </p>
  </AuthLayout>
</template>
