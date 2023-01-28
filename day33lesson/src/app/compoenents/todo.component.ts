import { Component, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Todo, Task } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Output()
  onNewTodo = new Subject<Todo>() // subject is an event which only accepts todo, use (event)="processEvent($event)" in html

  @Input()
  todo: Todo | null = null

  todoForm!: FormGroup; // ! to initialise the form
  taskArray!: FormArray


  constructor(private fb: FormBuilder) {}

  ngOnInit():void {
    this.todoForm = this.createForm(this.todo)
  }

  processForm() {
    const todo = this.todoForm.value as Todo
    console.info(">>>> todo: ", todo)
    this.onNewTodo.next(todo)
    // const t: Todo = {
    //   name: this.todoForm.get("name")?.value,
    //   email: this.todoForm.get("email")?.value,
    // } too tedious if this method is used. 
  }

  addTask() {
    this.taskArray.push(this.createTask())
  }

  removeTask(i: number) {
    this.taskArray.removeAt(i)
  }

  value(): Todo {
    return this.todoForm.value as Todo
  }

  invalid(): boolean {
    return this.todoForm.invalid || this.taskArray.length <= 0
  }

  clearForm() {
    this.todoForm=this.createForm()
  }

  private createTask(task: Task | null = null): FormGroup {
    return this.fb.group({
      task: this.fb.control(task?.task? task.task:'', [Validators.required]),
      priority: this.fb.control(task?.priority? task.priority: 'medium')
    })
  }

  private createTasks(task: Task[] = []):FormArray {
    // Returns an array of FormGroup
    return this.fb.array(task.map(t => this.createTask(t)))

    // for (let i =0; i < task.length; i++) {
    //   let fg = this.createTask(task[i]);
    //   this.taskArray.push(fg)
    // }
  }

  private createForm(todo: Todo | null = null):FormGroup {
    this.taskArray = this.createTasks(this.todo?.tasks? todo?.tasks:[])
    // or you can also write the below
    // if (this.todo?.tasks)
    //   this.taskArray = this.createTasks(todo?.tasks)
    // else
    //   this.taskArray=this.createTasks([])

    return this.fb.group({
      name: this.fb.control(todo?.name? todo.name:'',  // if todo.name has a value, return todo.name, else null. 
      // because todo may be null, need to put a ? (todo?.name?), or else if todo is null, it will throw an error.
      [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(todo?.email? todo.email:'', [Validators.required, Validators.email]),
      tasks: this.taskArray
    })
  }
}
