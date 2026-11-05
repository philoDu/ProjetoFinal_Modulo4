<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const mostrarHeader = computed(() => !route.meta.publica)
</script>

<template>
  <div class="min-h-dvh bg-slate-50 text-slate-900">
    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
    >
      Pular para o conteúdo
    </a>
    <AppHeader v-if="mostrarHeader" />
    <main id="conteudo">
      <RouterView />
    </main>
  </div>
</template>