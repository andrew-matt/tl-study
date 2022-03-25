import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Honey", isDone: false}
        ]
    })

    const addTodoList = (title: string) => {
        const newID = v1()
        setTodoLists([{id: newID, title, filter: "all"},...todoLists])
        setTasks({...tasks, [newID]: []})
    }

    const addTask = (todolistID: string, title: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false},...tasks[todolistID]]})
    }

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }

    const removeTodoList = (todolistID: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }

    const changeFilter = (todolistID: string, filter: FilterValueType) => {
        setTodoLists(todoLists.map(t => t.id === todolistID ? {...t, filter} : t))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title} : t)})
    }

    const changeTodoListTitle = (todolistID: string, title: string) => {
        setTodoLists(todoLists.map(t => t.id === todolistID ? {...t, title} : t))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(t => {

                let filteredTasks = tasks[t.id]

                if (t.filter === "active") {
                    filteredTasks = tasks[t.id].filter(t => !t.isDone)
                }

                if (t.filter === "completed") {
                    filteredTasks = tasks[t.id].filter(t => t.isDone)
                }

                return (
                    <Todolist
                        key={t.id}
                        todolistID={t.id}
                        title={t.title}
                        tasks={filteredTasks}
                        filter={t.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
