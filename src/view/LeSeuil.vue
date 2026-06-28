<script setup lang="ts">

import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import PrincipeSection from '@/components/PrincipeSection.vue'
import ParcoursSection from '@/components/ParcoursSection.vue'
import PourQuiSection from '@/components/PourQuiSection.vue'
import DemandForm from '@/components/DemandForm.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useTheme } from '@/composables/useTheme'

const { dark, toggleTheme } = useTheme()
</script>

<template>
  <div>
    <AppHeader :dark="dark" @toggle-theme="toggleTheme" />
    <HeroSection />
    <PrincipeSection />
    <ParcoursSection />
    <PourQuiSection />
    <DemandForm />
    <AppFooter />
  </div>
</template>
