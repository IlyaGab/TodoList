import {FilterPropsType, TodoListType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoList = {
    type: 'ADD-TODOLIST'
    title: string
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

export type ActionsType = RemoveTodoListAT | AddTodoList | ChangeTodoListTitle | ChangeTodoListFilter

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case  'ADD-TODOLIST':
            let newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'All'
            }
            return [newTodoList, ...todoLists]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return todoLists
    }

}

export const RemoveTodoListAC = (id:string) :RemoveTodoListAT => {
    return ({type:'REMOVE-TODOLIST', id:id})
}

export const AddTodoListAC = (title:string) :AddTodoList => {
    return ({type:'ADD-TODOLIST', title:title})
}
export const ChangeTitleTodoListAC = (id:string, title:string) :ChangeTodoListTitle => {
    return ({type:'CHANGE-TODOLIST-TITLE', id:id, title:title})
}
export const ChangeFilterTodoListAC = (id:string, filter:FilterPropsType) :ChangeTodoListFilter => {
    return ({type:'CHANGE-TODOLIST-FILTER', id:id, filter:filter})
}