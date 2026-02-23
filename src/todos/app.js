// Importacion en crudo usando ?raw no importa el formato lo importa de todos modos
import html from './app.html?raw';
import todoStore from '../store/todo.store';
import {renderTodos} from '../todos/models/use-cases';

const elementIds = {
    todoList: '.todo-list',
    newTodoInput: '#new-todo-input', // Apuntado al id de la caja input
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

    // Referencias HTML
    const newDescriptionInput = document.querySelector(elementIds.newTodoInput);
    const todoListUL = document.querySelector(elementIds.todoList);         // Referencia a la lista de todos


    // Listener
    newDescriptionInput.addEventListener('keyup', (event) => {  // Evento que escucha cuando una persona presiona una tecla y la suelta
        // solo continua si se presiona enter KeyCode === 13
        if( event.keyCode !== 13) return;
        // Valida si se a introducido algum valor
        if( event.target.value.trim().length === 0) return; // Metodo trim elimina espacios blancos al principio y final

        // Valor de la caja de texto
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';    // Elimina la ultima entrada en el input para evitar al presionar enter que almacen el mismo ojbeto duplicado

    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');  // toma el elemnto con ese data-aibute mas cercano hacia el padre
        
        todoStore.toggleTodo(element.getAttribute('data-id'));  // Toma elemento dentro del listItem con atributo data-id, se refiere al todo elegido
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;
        
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
      
   
    });


}