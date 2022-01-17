<template>
  <div class="flex items-center">
    <div
      v-for="(select, s) in selected"
      :key="s"
      class="rounded-lg px-3 py-1 uppercase font-semibold text-xs mr-4 border border-cyan-500 cursor-pointer"
      :class="{
        'bg-cyan-500 text-white': modelValue === select,
        'text-cyan-500': modelValue !== select,
      }"
      @click="() => handleSelect(select)"
    >
      {{ select }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const selected = ['all', 'finished', 'unfinished']

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: 'all',
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const router = useRouter()

    const handleSelect = (value: string) => {
      router.push({ query: { filter: value } })
      emit('update:modelValue', value)
    }
    return { selected, handleSelect }
  },
})
</script>
