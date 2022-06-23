import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8d69feac-9319-4391-a8a4-a23d67360845'
    }
})

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get('todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post('todo-lists', {title: 'todolist 2'})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}`, {title: title})
        return promise
    }
}

