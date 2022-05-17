import {v1} from 'uuid';
import {FilterPropsType, TodoListType} from '../App';
import {
    AddTodoListAC, ChangeFilterTodoListAC, ChangeTitleTodoListAC,
    ChangeTodoListFilter,
    ChangeTodoListTitle,
    RemoveTodoListAC,
    todolistsReducer
} from './todolists-reducer';

test('correct todolist should be removed', ()=>{

    const toDoListID_1 = v1()
    const toDoListID_2 = v1()

    const startTodoLists :Array<TodoListType> =[
            {id: toDoListID_1, title: 'What to learn', filter: 'All'},
            {id: toDoListID_2, title: 'What to buy', filter: 'All'},
        ]
    const endState = todolistsReducer(startTodoLists, RemoveTodoListAC(toDoListID_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoListID_2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
    const action:ChangeTodoListTitle = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, ChangeTitleTodoListAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterPropsType = "Completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action: ChangeTodoListFilter  = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, ChangeFilterTodoListAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});


