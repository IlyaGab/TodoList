import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeFilterTodoListAC,
    ChangeTitleTodoListAC,
    RemoveTodoListAC,
    todolistsReducer
} from './reducers/todolists-reducer';
import {addTaskAC, changeStatusAC, changeTitleAC, RemoveTaskAC, tasksReducer} from './reducers/tasks-reducer';



type StudentType = {
    id: number
    name: string
}

type FriendsType = {
    [key: string]: Array<String>
}

export const students: Array<StudentType> = [
    {id: 1, name: "Bob"},
    {id: 2, name: "Alex"},
    {id: 3, name: "Ann"},
    {id: 4, name: "Charley"},
]

export const friends: FriendsType = {
    1: ["Oliver", "Jack", "Oscar",],
    2: ["Jack", "Lewis", "Thomas",],
    3: ["William", "Michael", "Lewis",],
    4: ["Oscar", "James", "William",],
}
console.log( friends[students[0].id][3])


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
    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer,[
            {id: toDoListID_1, title: 'What to learn', filter: 'All'},
            {id: toDoListID_2, title: 'What to buy', filter: 'All'},
        ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        dispatchTasks(RemoveTaskAC(newId, toDoListID))
    }
    const addTask = (title: string, toDoListID: string) => {
        dispatchTasks(addTaskAC(title,toDoListID))
    }
    const changeStatus = (taskId: string, isDone: boolean, toDoListID: string) => {
        dispatchTasks(changeStatusAC(taskId,isDone,toDoListID ))
    }
    const changeTitle = (taskId: string, newTitle: string, toDoListID: string) => {
        dispatchTasks(changeTitleAC(taskId,newTitle, toDoListID ))
    }

    const changeFilter = ( filter: FilterPropsType , todoListID: string ) => {
        dispatchTodoLists(ChangeFilterTodoListAC(filter, todoListID))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchTodoLists(ChangeTitleTodoListAC(title,todoListID))
    }
    const removeTodoList = (todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
        delete tasks[todoListID]
    }

    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
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
