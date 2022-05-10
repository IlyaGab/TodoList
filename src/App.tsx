import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


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


    const removeTask = (newId: string, toDoListID: string) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter((t) => t.id !== newId)})
    }

    const addTask = (title: string, toDoListID: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [toDoListID]: [newTask, ...tasks[toDoListID]]})
    }

    const changeStatus = (taskId: string, isDone: boolean, toDoListID: string) => {
        const tasksForCurrentTodoList = tasks[toDoListID]
        const upDatedTask = tasksForCurrentTodoList.map((t) => t.id === taskId ? {...t, isDone: isDone} : t)
        const copyTasks = {...tasks}
        copyTasks[toDoListID] = upDatedTask
        setTasks(copyTasks)
    }

    const changeTitle = (taskId: string, newTitle: string, toDoListID: string) => {
        setTasks({
            ...tasks,
            [toDoListID]: tasks[toDoListID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    const changeFilter = (filter: FilterPropsType, todoListID: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const addTodoList = (title: string) => {
        let newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'All'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    //BLL

    //UI:

    const todoListsForRender = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]

        if (tl.filter === 'Active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
            console.log(tasksForTodoList, 'hello')
        }

        if (tl.filter === 'Completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       square
                       style={{padding: '20px'}}
                >
                    <Todolist
                              todoListID={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeFilter={changeFilter}
                              changeTodoListTitle={changeTodoListTitle}
                              changeStatus={changeStatus}
                              changeTitle={changeTitle}
                              removeTodoList={removeTodoList}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsForRender}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
