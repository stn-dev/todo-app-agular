import { Component } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';
import { FormsModule } from '@angular/forms';

export interface TodosType {
  title: string;
  id: number;
  isCompleted: boolean;
}

type FilterType = 'All' | 'Completed' | 'Uncompleted';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  imports: [TodoItem, FormsModule],
  templateUrl: './todo-list.html',
})
export class TodoList {
  // variables
  todoFilterType: FilterType[] = ['All', 'Completed', 'Uncompleted'];
  activeFilterButtonId: number = 0;
  todos: TodosType[] = [
    { title: 'Learn', id: 1, isCompleted: false },
    { title: 'Practice', id: 2, isCompleted: false },
    { title: 'Repeat', id: 3, isCompleted: false },
  ];
  newTask = '';
  newTodo!: TodosType;
  completedTodo: TodosType[] = this.todos.filter(
    (todo) => todo.isCompleted === true
  );
  unCompletedTodo: TodosType[] = this.todos.filter(
    (todo) => todo.isCompleted === false
  );
  filteredTodo: TodosType[] = this.todos;

  // methods
  onTodoChange = () => {
    this.completedTodo = this.todos.filter((todo) => todo.isCompleted === true);
    this.unCompletedTodo = this.todos.filter(
      (todo) => todo.isCompleted === false
    );

    if (this.activeFilterButtonId === 0) {
      this.filteredTodo = this.todos;
    } else if (this.activeFilterButtonId === 1) {
      this.filteredTodo = this.completedTodo;
    } else {
      this.filteredTodo = this.unCompletedTodo;
    }
  };

  addTodo = () => {
    if (this.newTask.trim() === '') {
      alert('Task cannot be empty');
      this.newTask = '';
      return;
    }

    this.newTodo = {
      title: this.newTask,
      id: Number(Date.now()),
      isCompleted: false,
    };
    this.todos.unshift(this.newTodo);
    this.onTodoChange();
    this.filteredTodo = this.todos;
    this.newTask = '';
  };

  toggleItemStatus = (todo: TodosType) => {
    this.todos.map((item) => (item.id === todo.id ? todo : item));
    this.onTodoChange();
  };

  filterByType = (type: 'All' | 'Completed' | 'Uncompleted', id: number) => {
    this.activeFilterButtonId = id;

    if (type === 'All') {
      this.filteredTodo = this.todos;
    } else if (type === 'Completed') {
      this.filteredTodo = this.completedTodo;
    } else {
      this.filteredTodo = this.unCompletedTodo;
    }
  };

  deleteTodo = (todo: TodosType) => {
    this.todos = this.todos.filter((item) => item !== todo);
    this.onTodoChange();
  };
}
