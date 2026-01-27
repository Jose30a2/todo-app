import './style.css';
import {App} from './todos/app';
import TodoStore from './store/todo.store';


TodoStore.initStore();

App('#app');