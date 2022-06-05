import {FilterPropsType, TodoListType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoList = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID:string
}

export type ChangeTodoListTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string

}

export type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterPropsType
}

export let toDoListID_1 : string
export let toDoListID_2 : string

toDoListID_1 = v1()
toDoListID_2 = v1()

const initialState: Array<TodoListType>  = []

export type ActionsType = RemoveTodoListAT | AddTodoList | ChangeTodoListTitle | ChangeTodoListFilter

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case  'ADD-TODOLIST':
            let newTodoListID = action.todolistID
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'All'
            }
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state
    }

}

export const RemoveTodoListAC = (id:string) :RemoveTodoListAT => {
    return ({type:'REMOVE-TODOLIST', id:id})
}

export const AddTodoListAC = (title:string) :AddTodoList => {
    return ({type:'ADD-TODOLIST', title:title, todolistID:v1()})
}
export const ChangeTitleTodoListAC = (id:string, title:string) :ChangeTodoListTitle => {
    return ({type:'CHANGE-TODOLIST-TITLE', id:id, title:title})
}
export const ChangeFilterTodoListAC = ( filter:FilterPropsType, id:string) :ChangeTodoListFilter => {
    return ({type:'CHANGE-TODOLIST-FILTER',  filter:filter,id:id})
}