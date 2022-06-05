import {RemoveTaskAC, addTaskAC, changeTitleAC, tasksReducer, changeStatusAC} from './tasks-reducer';
import {TaskStateType, TodoListType} from '../App';
import {AddTodoListAC, RemoveTodoListAC, todolistsReducer} from './todolists-reducer';



let startState: TaskStateType

beforeEach(()=>{
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
})
    test('correct task should be added to correct array', () => {

        let action = RemoveTaskAC("2", "todolistId2");

        let endState = tasksReducer(startState, action)

        expect(endState).toEqual({
            "todolistId1": [
                {id: "1", title: "CSS", isDone: false},
                {id: "2", title: "JS", isDone: true},
                {id: "3", title: "React", isDone: false}
            ],
            "todolistId2": [
                {id: "1", title: "bread", isDone: false},
                {id: "3", title: "tea", isDone: false}
            ]
        });
    })

    test('correct task should be added to correct array', () => {

        let action = addTaskAC("juce", "todolistId2");

        let endState = tasksReducer(startState, action)

        expect(endState["todolistId1"].length).toBe(3);
        expect(endState["todolistId2"].length).toBe(4);
        expect(endState["todolistId2"][0].id).toBeDefined();
        expect(endState["todolistId2"][0].title).toBe("juce");
        expect(endState["todolistId2"][0].isDone).toBe(false);
    })

    test('status of specified task should be changed', () => {

        let action = changeStatusAC("2", false, "todolistId2");

        let endState = tasksReducer(startState, action)

        expect(endState["todolistId2"][1].isDone).toBe(false);
        expect(endState["todolistId1"][1].isDone).toBe(true);
    });

    test('title of specified task should be changed', () => {

        let action = changeTitleAC("2", 'newTitle', "todolistId2");

        let endState = tasksReducer(startState, action)

        expect(endState["todolistId2"][1].title).toBe('newTitle');
        expect(endState["todolistId1"][1].title).toBe('JS');
    });



    test('new array should be added when new todolist is added', () => {

        let action = AddTodoListAC("new todolist");

        let endState = tasksReducer(startState, action)


        const keys = Object.keys(endState);
        const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
        if (!newKey) {
            throw Error("new key should be added")
        }

        expect(keys.length).toBe(3);
        expect(endState[newKey]).toEqual([]);
    });

    test('ids should be equals', () => {
        const startTasksState: TaskStateType = {};
        const startTodolistsState: Array<TodoListType> = [];

        const action = AddTodoListAC("new todolist");

        const endTasksState = tasksReducer(startTasksState, action)
        const endTodolistsState = todolistsReducer(startTodolistsState, action)

        const keys = Object.keys(endTasksState);
        const idFromTasks = keys[0];
        const idFromTodolists = endTodolistsState[0].id;

        expect(idFromTasks).toBe(action.todolistID);
        expect(idFromTodolists).toBe(action.todolistID);
    });

    test('property with todolistId should be deleted', () => {
        const startState: TaskStateType = {
            "todolistId1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todolistId2": [
                { id: "1", title: "bread", isDone: false },
                { id: "2", title: "milk", isDone: true },
                { id: "3", title: "tea", isDone: false }
            ]
        };

        const action = RemoveTodoListAC("todolistId2");

        const endState = tasksReducer(startState, action)

        const keys = Object.keys(endState);

        expect(keys.length).toBe(1);
        expect(endState["todolistId2"]).not.toBeDefined();
    });


