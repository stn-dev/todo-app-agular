import { Component } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';

export interface TodosType {
  title: string;
  id: number;
  isCompleted: boolean;
}

type FilterType = 'All' | 'Completed' | 'Uncompleted';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
})
export class TodoList {
  // variables
  todoFilterType: FilterType[] = ['All', 'Completed', 'Uncompleted'];
  avtiveFilterButtonId: number = 0;
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

  // methodes
  onTodoChange = () => {
    this.completedTodo = this.todos.filter((todo) => todo.isCompleted === true);
    this.unCompletedTodo = this.todos.filter(
      (todo) => todo.isCompleted === false
    );

    if (this.avtiveFilterButtonId === 0) {
      this.filteredTodo = this.todos;
    } else if (this.avtiveFilterButtonId === 1) {
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
    this.todos.push(this.newTodo);
    this.onTodoChange();
    this.filteredTodo = this.todos;
    this.newTask = '';
  };

  toogleItemStatus = (todo: TodosType) => {
    this.todos.map((item) => (item.id === todo.id ? todo : item));
    this.onTodoChange();
  };

  filterByType = (type: 'All' | 'Completed' | 'Uncompleted', id: number) => {
    this.avtiveFilterButtonId = id;

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
