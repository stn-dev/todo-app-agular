import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { TodosType } from '../todo-list/todo-list';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
})
export class TodoItem {
  @Input() todoItem: TodosType = {
    title: '',
    id: 0,
    isCompleted: false,
  };
  @Output() shareId = new EventEmitter<TodosType>();
  @Output() onDelete = new EventEmitter<TodosType>();

  toogleCompleted = () => {
    this.todoItem.isCompleted = !this.todoItem.isCompleted;
    this.shareId.emit(this.todoItem);
  };

  deleteTask = () => {
    this.onDelete.emit(this.todoItem);
  };
}
