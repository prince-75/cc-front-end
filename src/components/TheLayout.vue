<template>
  <div class="min-h-screen w-screen" :class="isDark ? 'dark bg-gray-900' : 'bg-gray-50'">
    <nav class="border-b w-full" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <img src="../assets/logo.png" class="h-8 w-8" alt="Logo" />
            <span class="ml-2 text-xl font-semibold text-primary">
              仿真训练-参数调整控制台
            </span>
          </div>
          <button
            @click="toggleDark()"
            class="p-2 rounded-lg text-primary hover:bg-primary hover:text-white"
          >
            <sun-icon v-if="isDark" class="h-6 w-6" />
            <moon-icon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
    <div class="container mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script> 