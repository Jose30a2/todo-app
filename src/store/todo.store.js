import { Todo } from '../todos/models/todo.models';


export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra eperanza'),
    ],
    filter: Filters.All
}


const initStore = () => {
    loadStore();
    console.log('Init Store');
}

const loadStore = () => {
   if(!localStorage.getItem('state')) return;

   const{ todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
   state.todos = todos;
   state.filter = filter;

  
}

const saveStateLocalStorage = () => {
   
    localStorage.setItem('state', JSON.stringify(state));   // Serializa state como un string 
    
}

/**
 * Get all todos
 * @param {Filter} filter 
 * @returns state of todos
 */
const getTodos = ( filter = Filters.All) => {
    switch (filter){
        case Filters.All:
            return [...state.todos];    // Uso del operador spread para devolver una copia de status
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid`);

    }
}

/**
 * Add a new Todo
 * @param {String} Description of todo 
 */
const addTodo = ( description ) => {
    if( !description ) throw new Error('Description is requerid');
    state.todos.push(new Todo(description));

    saveStateLocalStorage();
}

/**
 * Toggle todo done to completed
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateLocalStorage();
}

/**
 * Delete a todo
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);

    saveStateLocalStorage();
}

/**
 * Delete all todo completed
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done);

    saveStateLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setSelectedFilter = ( newFilter = Filters.All ) => {
    if( !Object.keys(Filters).includes(newFilter)) throw new Error('Filter not allowed');
    state.filter = newFilter;

    saveStateLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default{
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setSelectedFilter,
    toggleTodo,
}