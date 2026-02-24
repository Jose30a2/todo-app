// Importacion en crudo usando ?raw no importa el formato lo importa de todos modos
import html from './app.html?raw';
import todoStore from '../store/todo.store';
import {renderTodos, renderPending} from '../todos/models/use-cases';
import { Filters } from '../store/todo.store';

const elementIds = {
    todoList: '.todo-list',
    newTodoInput: '#new-todo-input', // Apuntado al id de la caja input
    clearCompleted: '.clear-completed',
    todoFilters: '.filtro',
    pendingCountLabel: '#pending-count',
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
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIds.pendingCountLabel);
    };


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
    const clearCompletedButton = document.querySelector(elementIds.clearCompleted);
    const filtersLIs = document.querySelectorAll(elementIds.todoFilters);


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

    clearCompletedButton.addEventListener('click', () => {
       
       todoStore.deleteCompleted();
       displayTodos();
       
   
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected')); // Elimino class selected de todos
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setSelectedFilter(Filters.All);
                    break;
                case 'Completados':
                    todoStore.setSelectedFilter(Filters.Completed);
                    break;
                 case 'Pendientes':
                    todoStore.setSelectedFilter(Filters.Pending);
                    break;
            }
            displayTodos();
        })
    })


}