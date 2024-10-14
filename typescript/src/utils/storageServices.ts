import { TodoType } from "./todo"

const TODO_KEY : string = "todos"

export const storageServices = {

    getTodos :  () : TodoType[] => {
        const todoString = localStorage.getItem(TODO_KEY)
        
        return todoString ? JSON.parse(todoString) : [];
    },

    addTodos : (text : string) : TodoType => {
        const todos = storageServices.getTodos();
        let id = todos.length + 1;
        const newTodo : TodoType = {id :id ,text: text, completed : false};
        const updateTodo : TodoType[] = [...todos,newTodo];
        
        localStorage.setItem(TODO_KEY, JSON.stringify(updateTodo))


        return newTodo;
    },


    editTodo : (id : number) => {

    },

    updateTodo : (id : number, text : string) => {
        const todos = storageServices.getTodos();
        const todoUpdate = todos.map((todo) => todo.id === todo.id)
    }



    // deleteTodos : (id : number) : void => {
    //     const todos = storageServices.getTodos()
        
    // },




}