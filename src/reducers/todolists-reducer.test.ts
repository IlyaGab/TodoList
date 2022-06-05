import {v1} from 'uuid';
import {FilterPropsType, TodoListType} from '../App';
import {
    AddTodoListAC, ChangeFilterTodoListAC, ChangeTitleTodoListAC,
    RemoveTodoListAC,
    todolistsReducer
} from './todolists-reducer';

let toDoListID_1: string
let toDoListID_2: string

let startState: Array<TodoListType>


beforeEach(() => {
    toDoListID_1 = v1()
    toDoListID_2 = v1()

    startState = [
        {id: toDoListID_1, title: 'What to learn', filter: 'All'},
        {id: toDoListID_2, title: 'What to buy', filter: 'All'},
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodoListAC(toDoListID_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoListID_2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, ChangeTitleTodoListAC(toDoListID_2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterPropsType = 'Completed';

    const endState = todolistsReducer(startState, ChangeFilterTodoListAC(newFilter, toDoListID_2));

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});






