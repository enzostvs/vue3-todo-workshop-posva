<template>
  <form class="mt-6 w-full border border-gray-800 rounded-2xl p-3 flex items-center justify-between" v-on:submit.prevent="submit">
    <div class="rounded-lg bg-pink-500 text-gray-900 font-bold w-6 h-6 min-w-[1.5rem] p-0.5">
      <PlusIcon />
    </div>
    <input
      v-model="form.content"
      placeholder="Add a task"
      class="bg-transparent w-full border-none outline-none text-white mx-3"
    />
    <button class="bg-pink-500 text-white rounded-lg px-3 py-1 font-semibold text-sm transition duration-200 transform hover:-translate-y-1 whitespace-nowrap">Reminder me</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { PlusIcon } from '@heroicons/vue/solid'

import useTodo from '@/stores/useTodo'

export default defineComponent({
  components: { PlusIcon },
  setup() {
    const form = reactive({
      content: '',
      error: false,
    })

    const store = useTodo()
    
    const submit = () => {
      if (form.content?.length === 0) {
        form.error = true
        return
      }
      form.error = false
      store.create(form.content)
        .then(() => form.content = '')
    }

    return { form, submit }
  }
})
</script>
