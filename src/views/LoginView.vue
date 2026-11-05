<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AuthLayout from "@/components/AuthLayout.vue";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref("");
const senha = ref("");
const erro = ref("");

function entrar() {
  erro.value = "";
  try {
    auth.login(email.value, senha.value);
    // Volta para a página que a pessoa tentou acessar, se for um caminho interno
    const destino = route.query.redirect;
    const caminhoInterno =
      typeof destino === "string" && destino.startsWith("/");
    router.push(caminhoInterno ? destino : { name: "dashboard" });
  } catch (e) {
    erro.value = e.message;
  }
}
</script>

<template>
  <AuthLayout
    titulo="Entrar"
    subtitulo="Acesse sua conta para gerenciar suas tarefas."
  >
    <form class="space-y-5" @submit.prevent="entrar">
      <p
        v-if="erro"
        role="alert"
        class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
      >
        {{ erro }}
      </p>

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
          autocomplete="current-password"
          required
          class="campo"
        />
      </div>

      <button type="submit" class="botao-primario">Entrar</button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-600">
      Não tem uma conta?
      <RouterLink
        :to="{ name: 'cadastro' }"
        class="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
      >
        Cadastre-se
      </RouterLink>
    </p>

    <p class="mt-6 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
      <strong>Conta de teste:</strong> ana@exemplo.com · senha 123456
    </p>
  </AuthLayout>
</template>
