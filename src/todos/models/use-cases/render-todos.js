import {createTodoHtml} from './';

let element;

/**
 * Renderizar todos en el html
 * @param {String} elementId  Id del elemento html donde se renderizan los todos
 * @param {todos} todos state cargado del store
 */
export const renderTodos = ( elementId, todos = []) => {

    if( !element )
        element = document.querySelector(elementId);
    
    if( !element ) throw new Error(`Element ${ elementId } not found`);

    // Eliminamos el contenido antes de renerizar los todos
    element.innerHTML = '';

    todos.forEach( todo => {
        element.append(createTodoHtml(todo));
        
    });

}