import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterPropsType} from './App';
import c from './Todolist.module.css'
import Button from './components/Button';
import CheckBox from './components/CheckBox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    key:string
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter:FilterPropsType
    removeTask: (id: string, todoListID:string) => void
    addTask:(title:string, todoListID:string)=>void
    changeStatus: (taskId:string, isDone:boolean, todoListID:string)=>void
    changeFilter:(filter:FilterPropsType, todoListID:string)=>void
    removeTodoList:(todoListID:string)=>void
}

export function Todolist(props: PropsType) {

    let [error, setError] = useState<string | null>(null)

    let tasksForTodoList = props.tasks

    let [newTitle, setNewTitle] = useState('')

    const onRemoveHandler = (el:string, todoListID:string) => {
        props.removeTask(el, props.todoListID)
    }

    const changeFilterUniversal = (filter:FilterPropsType, todoListID:string ) => {
        props.changeFilter(filter, props.todoListID)
    }

    const onClickHandler = () => {
        if(newTitle.trim() !== ''){
            props.addTask(newTitle.trim(), props.todoListID)
            setNewTitle('')
        } else {
            setError("Title is required");
        }

    }

    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
        setError('')
    }

    const onKeyPressInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13){
            onClickHandler()
        }
    }
    const onChangeCheckboxHandler = (taskId:string, isDone:boolean,todoListID:string ) => {
        props.changeStatus (taskId, isDone, props.todoListID)
    }

    const onRemoveTodoList = () => {
        props.removeTodoList(props.todoListID)
    }


    return <div>
        <h3>{props.title}
            <button onClick={onRemoveTodoList}>x</button>
        </h3>
        <div>
            <input value={newTitle} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler} className={error ?c.error :''}/>
            <button onClick={onClickHandler} >+</button>
            {error && <div className={c.errorMessage}>{error}</div>}
        </div>
        <ul>
            {tasksForTodoList.map((el) => {
                console.log(tasksForTodoList)
                return (
                    <li key={el.id} className={el.isDone ?c.isDone :''}>
                        <CheckBox isDone={el.isDone} callBack={(isDone)=>onChangeCheckboxHandler(el.id, isDone, props.todoListID)}  />
                        {/*<input type="checkbox" onChange={onChangeCheckboxHandler} checked={el.isDone} />*/}
                        <span> {el.title} </span>
                        <button onClick={()=>onRemoveHandler(el.id, props.todoListID)}>del</button>
                    </li>
                )
            })}
        </ul>
        <div>


            <Button name={'all'} callBack={()=>changeFilterUniversal('All', props.todoListID)} className={props.filter === 'All' ?c.activeFilter : ''} />
            <Button name={'active'} callBack={()=>changeFilterUniversal ('Active', props.todoListID)}  className={props.filter === 'Active' ?c.activeFilter : ''}/>
            <Button name={'completed'} callBack={()=>changeFilterUniversal ('Completed', props.todoListID)} className={props.filter === 'Completed' ?c.activeFilter : ''} />
        </div>
    </div>
}
