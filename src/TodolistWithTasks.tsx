import React from 'react';
import {FilterPropsType} from './App';
import CheckBox from './components/CheckBox';
import {AddItemForm} from './components/AddItemForm';
import EditableSpan from './components/EditableSpan';
import {Button, ListItem, IconButton} from '@material-ui/core';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {TodoListType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeStatusAC, changeTitleAC, RemoveTaskAC} from './reducers/tasks-reducer';
import {ChangeFilterTodoListAC, ChangeTitleTodoListAC, RemoveTodoListAC} from './reducers/todolists-reducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todoList: TodoListType
}

export function TodolistWithTasks({todoList}: PropsType) {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todoList.id])

    if (todoList.filter === 'Active') {
        tasks = tasks.filter(t => !t.isDone)
    }

    if (todoList.filter === 'Completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title,todoList.id))
    }

    const onRemoveHandler = (title: string, todoListID: string) => {
        dispatch(RemoveTaskAC(title, todoListID))
    }

    const changeFilterUniversal = (filter: FilterPropsType, todoListID: string) => {
       dispatch(ChangeFilterTodoListAC(filter, todoListID))
    }

    const onChangeCheckboxHandler = (taskId: string, isDone: boolean, todoListID: string) => {
        dispatch(changeStatusAC(taskId, isDone, todoListID))
    }

    const onRemoveTodoList = () => {
       dispatch(RemoveTodoListAC(todoList.id))
    }

    const changeTodoListTitle = (title: string) => {
        dispatch(ChangeTitleTodoListAC(title, todoList.id))
    }

    const onAllClickHandler = () => dispatch(ChangeFilterTodoListAC('All', todoList.id))
    const onActiveClickHandler = () => dispatch(ChangeFilterTodoListAC('Active', todoList.id))
    const onCompletedClickHandler = () => dispatch(ChangeFilterTodoListAC('Completed', todoList.id))

    return <div>
        <h3><EditableSpan title={todoList.title} setNewTitle={changeTodoListTitle}/>
            <IconButton onClick={onRemoveTodoList}><DeleteSharpIcon/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {tasks.map((el) => {
                const changeTaskTitle = (newTitle: string) => {
                    dispatch(changeTitleAC(el.id, newTitle, todoList.id))
                }
                return (
                    <ListItem key={el.id} >
                        <CheckBox checked={el.isDone}
                                  onChange={(isDone) => onChangeCheckboxHandler(el.id, isDone, todoList.id)}/>
                        <EditableSpan title={el.title} setNewTitle={changeTaskTitle}/>
                        <IconButton
                            onClick={() => onRemoveHandler(el.id, todoList.id)}><DeleteSharpIcon/></IconButton>
                    </ListItem>
                )
            })}
        </ul>
        <div>


            <Button
                name={'all'}
                variant={'contained'}
                onClick={onAllClickHandler}
                color={todoList.filter === 'All' ? 'secondary' : 'primary'}> All
            </Button>
            <Button
                name={'active'}
                variant={'contained'}
                onClick={onActiveClickHandler}
                color={todoList.filter === 'Active' ? 'secondary' : 'primary'}> Active
            </Button>
            <Button
                name={'completed'}
                variant={'contained'}
                onClick={onCompletedClickHandler}
                color={todoList.filter === 'Completed' ? 'secondary' : 'primary'}> Completed
            </Button>
        </div>
    </div>
}
