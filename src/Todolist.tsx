import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterPropsType} from './App';
import c from './Todolist.module.css'
import Button from './components/Button';
import CheckBox from './components/CheckBox';
import {AddItemForm} from './components/AddItemForm';
import EditableSpan from './components/EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    key: string
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterPropsType
    removeTask: (id: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle:string, todoListID:string)=>void
    changeFilter: (filter: FilterPropsType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {

    let tasksForTodoList = props.tasks

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }


    const onRemoveHandler = (el: string, todoListID: string) => {
        props.removeTask(el, props.todoListID)
    }

    const changeFilterUniversal = (filter: FilterPropsType, todoListID: string) => {
        props.changeFilter(filter, props.todoListID)
    }

    const onChangeCheckboxHandler = (taskId: string, isDone: boolean, todoListID: string) => {
        props.changeStatus(taskId, isDone, props.todoListID)
    }

    const onRemoveTodoList = () => {
        props.removeTodoList(props.todoListID)
    }

    const changeTodoListTitle = (title:string)=>{
        props.changeTodoListTitle(title, props.todoListID)
    }

    return <div>
        <h3> <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
            <button onClick={onRemoveTodoList}>x</button>
        </h3>
            <AddItemForm addItem={addTask}/>
        <ul>
            {tasksForTodoList.map((el) => {
                const changeTaskTitle = (newTitle:string) => {
                    props.changeTitle(el.id, newTitle, props.todoListID)
                }
                return (
                    <li key={el.id} className={el.isDone ? c.isDone : ''}>
                        <CheckBox isDone={el.isDone} callBack={(isDone) => onChangeCheckboxHandler(el.id, isDone, props.todoListID)}/>
                        <EditableSpan title={el.title} setNewTitle={changeTaskTitle}/>
                        <button onClick={() => onRemoveHandler(el.id, props.todoListID)}>del</button>
                    </li>
                )
            })}
        </ul>
        <div>


            <Button name={'all'} callBack={() => changeFilterUniversal('All', props.todoListID)}
                    className={props.filter === 'All' ? c.activeFilter : ''}/>
            <Button name={'active'} callBack={() => changeFilterUniversal('Active', props.todoListID)}
                    className={props.filter === 'Active' ? c.activeFilter : ''}/>
            <Button name={'completed'} callBack={() => changeFilterUniversal('Completed', props.todoListID)}
                    className={props.filter === 'Completed' ? c.activeFilter : ''}/>
        </div>
    </div>
}
