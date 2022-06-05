import React from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,

} from './reducers/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithTasks} from './TodolistWithTasks';

export  type FilterPropsType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterPropsType
}
export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL:

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let dispatch = useDispatch()
    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }
    //BLL

    //UI:

    const todoListsForRender = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       square
                       style={{padding: '20px'}}
                >
                    <TodolistWithTasks
                        todoList={tl}
                        />
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

export default AppWithRedux;
