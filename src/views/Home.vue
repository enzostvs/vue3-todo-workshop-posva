<template>
  <div class="w-full max-w-2xl mx-auto px-4 pb-12">
    <div class="w-full pt-12 pb-6 top-0 sticky bg-gray-900 z-10">
      <p class="text-gray-400 text-3xl font-semibold mb-2">Hello... 👋</p>
      <h1 class="text-white text-5xl font-bold">What's up today&nbsp;?</h1>
      <AddTodo />
    </div>
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AddTodo from '@/components/AddTodo.vue'
import TodoList from '@/components/TodoList.vue'

export default defineComponent({
  components: { AddTodo, TodoList }
})
</script>
