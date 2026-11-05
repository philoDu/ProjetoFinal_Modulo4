<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

// "Ana Souza" -> "AS"
const iniciais = computed(() => {
  const nome = auth.usuarioLogado?.nome ?? "";
  return nome
    .split(" ")
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
});

function sair() {
  auth.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <header
    class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6"
    >
      <RouterLink
        :to="{ name: 'dashboard' }"
        class="flex items-center gap-2 rounded-md"
      >
        <span
          class="grid size-8 place-items-center rounded-lg bg-blue-600 font-bold text-white"
          aria-hidden="true"
          >✓</span
        >
        <span class="text-lg font-bold tracking-tight">TaskFlow</span>
      </RouterLink>

      <nav aria-label="Navegação principal" class="flex items-center gap-2">
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
          exact-active-class="bg-slate-100 text-slate-900"
        >
          Quadro
        </RouterLink>
        <RouterLink
          :to="{ name: 'nova-tarefa' }"
          class="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <span aria-hidden="true">+</span>
          <span class="sr-only sm:not-sr-only">Nova tarefa</span>
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <span
          class="grid size-9 place-items-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700"
          aria-hidden="true"
          >{{ iniciais }}</span
        >
        <span class="hidden text-sm font-medium text-slate-700 md:inline">
          {{ auth.usuarioLogado?.nome }}
        </span>
        <button
          type="button"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
          @click="sair"
        >
          Sair
        </button>
      </div>
    </div>
  </header>
</template>
