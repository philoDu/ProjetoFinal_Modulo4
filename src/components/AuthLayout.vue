<script setup>
defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, default: '' },
})
</script>

<template>
  <div class="grid min-h-dvh lg:grid-cols-2">
    <!-- Painel lateral: só aparece em telas grandes -->
    <aside class="hidden flex-col justify-between bg-blue-600 p-12 text-white lg:flex">
      <div class="flex items-center gap-2">
        <span class="grid size-9 place-items-center rounded-lg bg-white font-bold text-blue-600" aria-hidden="true">✓</span>
        <span class="text-xl font-bold tracking-tight">TaskFlow</span>
      </div>
      <div>
        <p class="text-3xl font-semibold leading-snug">Organize o trabalho da equipe, do backlog à entrega.</p>
        <p class="mt-4 text-blue-100">Quadros, prioridades e prazos em um só lugar.</p>
      </div>
      <p class="text-sm text-blue-200">Projeto acadêmico — Senac</p>
    </aside>

    <!-- Área do formulário -->
    <div class="flex items-center justify-center px-4 py-12 sm:px-6">
      <div class="w-full max-w-sm">
        <div class="mb-8">
          <div class="mb-6 flex items-center gap-2 lg:hidden">
            <span class="grid size-8 place-items-center rounded-lg bg-blue-600 font-bold text-white" aria-hidden="true">✓</span>
            <span class="text-lg font-bold tracking-tight">TaskFlow</span>
          </div>
          <h1 class="text-2xl font-bold tracking-tight">{{ titulo }}</h1>
          <p v-if="subtitulo" class="mt-2 text-slate-600">{{ subtitulo }}</p>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>