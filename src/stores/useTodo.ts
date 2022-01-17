import { defineStore } from 'pinia'
import { TodoItem } from '@/ts'
import { $get, $patch } from '@/utils/storage'

const KEY_LOCAL_STORAGE = 'todo-list'

const useTodo = defineStore('todo', {
  state: () => {
    return {
      todos: null
    }
  },
  getters: {
    all: state => state.todos,
    finished: state => state.todos.filter(t => t.isFinished),
    unfinished: state => state.todos.filter(t => !t.isFinished),
  },
  actions: {
    create(content: string) {
      return new Promise((resolve, reject) => {
        const todos = this.checkIfExists()

        if (todos.find((t: TodoItem) => t.content === content)) reject('Todo already exists')
        const todoItem = {
          content,
          _id: Date.now(),
          isFinished: false
        }
        todos.push(todoItem)

        $patch(KEY_LOCAL_STORAGE, todos)
        this.todos = todos

        resolve(true)
      })
    },
    update(todo: TodoItem) {
      return new Promise((resolve) => {
        const todos = this.checkIfExists()
        const findTodoIndex = todos.findIndex((t: TodoItem) => t._id === todo._id)
        if (findTodoIndex >= 0) {
          todos[findTodoIndex] = todo
        }

        $patch(KEY_LOCAL_STORAGE, todos)
        this.todos = todos
        resolve(true)
      })
    },
    remove(_id: number) {
      let todos = this.checkIfExists()

      todos = todos.filter((t: TodoItem) => t._id !== _id)
      $patch(KEY_LOCAL_STORAGE, todos)
      this.todos = todos
    },
    checkIfExists() {
      return this.todos ?? $get(KEY_LOCAL_STORAGE) ?? []
    },
    init() {
      this.todos = $get(KEY_LOCAL_STORAGE) ?? []
    }
  }
})

export default useTodo;