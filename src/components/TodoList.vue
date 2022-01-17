<template>
  <TodoFilter v-model="filter" class="mb-6" />
  <div>
    <transition-group v-if="todos?.length > 0" name="list" tag="div" class="grid gap-5">
      <TodoListItem v-for="todo in todos" :key="todo._id" :todo="todo" />
    </transition-group>
    <p v-else class="text-gray-700 text-center">
      No tasks found
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import useTodo from '@/stores/useTodo'
import TodoFilter from '@/components/TodoFilter.vue'
import TodoListItem from '@/components/TodoListItem.vue'

export default defineComponent({
  components: { TodoFilter, TodoListItem },
  setup() {
    const filter = ref('all')
    const store = useTodo()
    const route = useRoute()
    
    onMounted(() => route.query.filter && (filter.value = route.query.filter as string))

    const todos = computed(() => {
      return store[filter.value]
    })

    return {
      todos,
      filter
    }
  }
})
</script>
