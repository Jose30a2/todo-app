// Importacion en crudo usando ?raw no importa el formato lo importa de todos modos
import html from './app.html?raw';

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();

}