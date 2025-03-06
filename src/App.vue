<script setup>
import { useDark } from '@vueuse/core'
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui'
import TheLayout from './components/TheLayout.vue'
import ParamsAdjuster from './components/ParamsAdjuster.vue'

const isDark = useDark()

const themeOverrides = {
  common: {
    primaryColor: '#08348c',
    primaryColorHover: '#0a41b0',
    primaryColorPressed: '#062a73',
    primaryColorSuppl: '#08348c',
  },
  Button: {
    textColor: '#08348c',
    textColorHover: '#ffffff',
    textColorPressed: '#ffffff',
    textColorFocus: '#08348c',
    borderColor: '#08348c',
    borderColorHover: '#0a41b0',
    borderColorPressed: '#062a73',
    borderColorFocus: '#08348c',
    rippleColor: '#08348c',
    colorHover: '#0a41b0',
    colorPressed: '#062a73',
    colorFocus: '#08348c',
  },
  Input: {
    borderHover: '#0a41b0',
    borderFocus: '#08348c',
  },
  InputNumber: {
    borderHover: '#0a41b0',
    borderFocus: '#08348c',
  },
  Form: {
    labelTextColor: '#08348c'
  }
}
</script>

<template>
  <n-message-provider>
    <n-config-provider :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
      <the-layout>
        <params-adjuster />
      </the-layout>
    </n-config-provider>
  </n-message-provider>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
