import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { splitClasses } from '@angular/compiler';
import { TodoService } from '../../services/todo.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() { }

  //set Dynamic Classes
  setClasses() {
    let Classes = {
      todo: true,
      'is-complete': this.todo.completed
    };
    return Classes;
  }

  // Too
  onToggle(todo) {
    //Toggle in UL
    todo.completed = !todo.completed;
    // Toggle in server
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }
  onDelete(todo) {
    //console.log('Delete');
    this.deleteTodo.emit(todo);
  }
}
