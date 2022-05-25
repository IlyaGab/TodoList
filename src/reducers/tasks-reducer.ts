import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoList, RemoveTodoListAT} from './todolists-reducer';


export type FirstTaskAT = ReturnType<typeof FirstTAC>
export type SecondTaskAT = ReturnType<typeof SecondTAC>
export type ThirdTaskAT = ReturnType<typeof ThirdTAC>
export type FourthTaskAT = ReturnType<typeof FourthTAC>


export type ActionsType = FirstTaskAT | SecondTaskAT | ThirdTaskAT | FourthTaskAT | AddTodoList | RemoveTodoListAT

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
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

export const FirstTAC = (taskID: string, todoListID: string) => {
    return ({type: 'REMOVE-TASK', taskId: taskID, todolistId: todoListID}) as const
}

export const SecondTAC = (title: string, toDoListID: string) => {
    return ({type: 'ADD-TASK', title: title, todolistId: toDoListID}) as const
}

export const ThirdTAC = (taskId: string, isDone: boolean, toDoListID: string) => {
    return ({type: 'CHANGE-STATUS', taskId: taskId, isDone: isDone, todolistId: toDoListID}) as const
}

export const FourthTAC = (taskId: string, newTitle: string, toDoListID: string) => {
    return ({type: 'CHANGE-TITLE', taskId: taskId, newTitle: newTitle, todolistId: toDoListID}) as const
}

