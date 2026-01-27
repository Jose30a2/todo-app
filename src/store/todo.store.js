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

export default{
    initStore,
}