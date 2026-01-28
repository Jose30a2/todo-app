import { Todo } from '../todos/models/todo.models';

const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
    ],
    filter: Filters.All
}


const initStore = () => {
    console.log(state);
    console.log('Init Store');
}

const loadStore = () => {
    throw new Error('Not implemented');
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
}

/**
 * Delete a todo
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
}

/**
 * Delete all todo completed
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.Completed);
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setSelectedFilter = ( newFilter = Filters.All ) => {
    if( !Object.keys(Filters).includes(newFilter)) throw new Error('Filter not allowed');
    state.filter = newFilter;
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