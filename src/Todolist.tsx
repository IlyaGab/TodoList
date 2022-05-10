import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterPropsType} from './App';
import c from './Todolist.module.css'
import CheckBox from './components/CheckBox';
import {AddItemForm} from './components/AddItemForm';
import EditableSpan from './components/EditableSpan';
import {Button, ListItem, IconButton} from '@material-ui/core';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterPropsType
    removeTask: (id: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
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

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return <div>
        <h3><EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
            <IconButton onClick={onRemoveTodoList}><DeleteSharpIcon/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {tasksForTodoList.map((el) => {
                const changeTaskTitle = (newTitle: string) => {
                    props.changeTitle(el.id, newTitle, props.todoListID)
                }
                return (
                    <ListItem key={el.id} >
                        <CheckBox checked={el.isDone}
                                  onChange={(isDone) => onChangeCheckboxHandler(el.id, isDone, props.todoListID)}/>
                        <EditableSpan title={el.title} setNewTitle={changeTaskTitle}/>
                        <IconButton
                            onClick={() => onRemoveHandler(el.id, props.todoListID)}><DeleteSharpIcon/></IconButton>
                    </ListItem>
                )
            })}
        </ul>
        <div>


            <Button
                name={'all'}
                variant={'contained'}
                onClick={() => changeFilterUniversal('All', props.todoListID)}
                color={props.filter === 'All' ? 'secondary' : 'primary'}> All
            </Button>
            <Button
                name={'active'}
                variant={'contained'}
                onClick={() => changeFilterUniversal('Active', props.todoListID)}
                color={props.filter === 'Active' ? 'secondary' : 'primary'}> Active
            </Button>
            <Button
                name={'completed'}
                variant={'contained'}
                onClick={() => changeFilterUniversal('Completed', props.todoListID)}
                color={props.filter === 'Completed' ? 'secondary' : 'primary'}> Completed
            </Button>
        </div>
    </div>
}
