import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';



export  type FilterPropsType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterPropsType
}
export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    //BLL:

    const toDoListID_1 = v1()
    const toDoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
            {id: toDoListID_1, title: 'What to learn', filter: 'All'},
            {id: toDoListID_2, title: 'What to buy', filter: 'All'},
        ]
    )

    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListID_1]:
            [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Rest API', isDone: false},
            ],
        [toDoListID_2]:
            [
                {id: v1(), title: 'Beer', isDone: true},
                {id: v1(), title: 'Meat', isDone: true},
                {id: v1(), title: 'Cheeps', isDone: false},
                {id: v1(), title: 'Toilet paper', isDone: false},
            ],
    })


    const removeTask = (newId: string, toDoListID:string) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter((t)=> t.id !== newId)})
    }

    const addTask = (title: string, toDoListID:string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [toDoListID]:[newTask, ...tasks[toDoListID]]})
    }

    const changeStatus = (taskId: string, isDone: boolean, toDoListID:string) => {
        const tasksForCurrentTodoList = tasks[toDoListID]
        const upDatedTask = tasksForCurrentTodoList.map((t)=> t.id === taskId ?{...t, isDone:isDone} :t)
        const copyTasks = {...tasks}
        copyTasks[toDoListID]  = upDatedTask
        setTasks(copyTasks)
    }

    const changeFilter = (filter:FilterPropsType, todoListID:string) => {
        setTodoLists(todoLists.map((tl)=> tl.id === todoListID ?{...tl, filter:filter} :tl))
    }

    const removeTodoList = (todoListID:string) => {
        setTodoLists(todoLists.filter((tl)=> tl.id !== todoListID ))
        delete tasks[todoListID]
    }
    //BLL

    //UI:

    const todoListsForRender = todoLists.map(tl=> {
        let tasksForTodoList = tasks[tl.id]

        if (tl.filter === 'Active') {
            tasksForTodoList = tasksForTodoList.filter(t=> !t.isDone)
            console.log(tasksForTodoList, 'hello')
        }

        if (tl.filter === 'Completed') {
            tasksForTodoList = tasksForTodoList.filter(t=> t.isDone)
        }

        return (
            <Todolist key={tl.id}
                      todoListID={tl.id}
                      title={tl.title}
                      filter={tl.filter}
                      tasks={tasksForTodoList}

                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      removeTodoList={removeTodoList} />
        )
    })

    return (
        <div className="App">
            {todoListsForRender}
        </div>
    );
}

export default App;