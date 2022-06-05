import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoList, RemoveTodoListAT, toDoListID_1, toDoListID_2} from './todolists-reducer';


export type RemoveTaskAC = ReturnType<typeof RemoveTaskAC>
export type addTaskAC = ReturnType<typeof addTaskAC>
export type changeStatusAC = ReturnType<typeof changeStatusAC>
export type changeTitleAC = ReturnType<typeof changeTitleAC>


export type ActionsType = RemoveTaskAC | addTaskAC | changeStatusAC | changeTitleAC | AddTodoList | RemoveTodoListAT



let initialState: TaskStateType = {
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
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-STATUS':
            return {...state,
                [action.todolistId]: state[action.todolistId].map((t) => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TITLE':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistID]: []
            }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }

}

export const RemoveTaskAC = (taskID: string, todoListID: string) => {
    return ({type: 'REMOVE-TASK', taskId: taskID, todolistId: todoListID}) as const
}

export const addTaskAC = (title: string, toDoListID: string) => {
    return ({type: 'ADD-TASK', title: title, todolistId: toDoListID}) as const
}

export const changeStatusAC = (taskId: string, isDone: boolean, toDoListID: string) => {
    return ({type: 'CHANGE-STATUS', taskId: taskId, isDone: isDone, todolistId: toDoListID}) as const
}

export const changeTitleAC = (taskId: string, newTitle: string, toDoListID: string) => {
    return ({type: 'CHANGE-TITLE', taskId: taskId, newTitle: newTitle, todolistId: toDoListID}) as const
}

