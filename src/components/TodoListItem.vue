<template>
  <div
    :class="{ 'opacity-50': todo.isFinished }"
    class="px-5 py-4 rounded-2xl bg-gray-800"
    @dblclick="handleEditing"
  >
    <div v-show="!isUpdating" class="flex items-start">
      <input
        v-model="todoEditable.isFinished"
        type="checkbox"
        class="focus:ring-pink-500 h-5 w-5 text-pink-600 rounded-lg bg-transparent border-pink-500 border-2 outline-none transform translate-y-1"
      />
      <div class="ml-4 w-full">
        <p :class="{ 'line-through': todo.isFinished }" class="text-gray-200 font-medium">{{ todo.content }}</p>
        <p :class="{ 'line-through': todo.isFinished }" class="text-sm text-gray-600 mt-1 flex items-center">
          <CalendarIcon class="w-4 mr-1" />
          {{ $dayjs(todo._id).format('dddd') }}
        </p>
      </div>
      <TrashIcon class="w-6 hover:text-red-500 text-gray-400 cursor-pointer" @click="remove" />
    </div>
    <form v-show="isUpdating" v-on:submit.prevent="submit" @keyup.esc="escape">
      <input
        ref="inputEditing"
        v-model="todoEditable.content"
        class="py-1.5 outline-none px-2 text-sm bg-transparent border rounded-lg focus:border-gray-600 focus:outline-none border-gray-600 text-gray-200 font-medium w-full"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, nextTick } from 'vue'
import { CalendarIcon } from '@heroicons/vue/outline'
import { TrashIcon } from "@heroicons/vue/solid"

import useTodo from '@/stores/useTodo'
import { TodoItem } from '@/ts'

export default defineComponent({
  components: { CalendarIcon, TrashIcon },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { todo } = props

    const todoEditable = ref({ ...todo })
    const isUpdating = ref(false)
    const inputEditing = ref(null)

    const store = useTodo()

    watch(todoEditable.value, newTodo => {
      if (newTodo.isFinished !== todo.isFinished) update(newTodo as TodoItem)
    })

    const handleEditing = () => {
      isUpdating.value = true
      nextTick(() => {
        inputEditing.value.focus()
      })
    }

    const update = (todo: TodoItem) => store.update(todo)
    const remove = () => store.remove(todo._id)

    const escape = () => {
      isUpdating.value = false
      todoEditable.value = todo
    }

    const submit = () => {
      if (todoEditable.value.content.length === 0) return
      update(todoEditable.value as TodoItem)
        .then(() => isUpdating.value = false)
    }

    return {
      isUpdating,
      handleEditing,
      inputEditing,
      remove,
      todoEditable,
      submit,
      escape
    }
  }
})
</script>
