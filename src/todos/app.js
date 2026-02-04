// Importacion en crudo usando ?raw no importa el formato lo importa de todos modos
import html from './app.html?raw';
import todoStore from '../store/todo.store';
import {renderTodos} from '../todos/models/use-cases';

const elementIds = {
    todoList: '.todo-list',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        console.log(todos);
        renderTodos(elementIds.todoList, todos);
    }


    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

}