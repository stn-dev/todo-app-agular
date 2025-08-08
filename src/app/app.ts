import { Component, signal } from '@angular/core';
import { TodoList } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [TodoList],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('first-test');
}
