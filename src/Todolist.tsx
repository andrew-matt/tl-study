import React, {MouseEvent} from "react";
import {FilterValueType} from "./App";
import s from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    removeTodoList: (todolistID: string) => void
    changeFilter: (todolistID: string, filter: FilterValueType) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeTodoListTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.todolistID)
    }

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistID, "all")
    }

    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistID, "active")
    }

    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistID, "completed")
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todolistID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = (e: MouseEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
                    }

                    const onClickRemoveTaskHandler = () => {
                        props.removeTask(props.todolistID, t.id)
                    }

                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.todolistID, t.id, title)
                    }

                    return (
                        <li>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onClick={onClickHandler}
                            />
                            <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                            <button onClick={onClickRemoveTaskHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === "all" ? s.activeFilter : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === "active" ? s.activeFilter : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === "completed" ? s.activeFilter : ''}>Completed
                </button>
            </div>
        </div>
    )
}

