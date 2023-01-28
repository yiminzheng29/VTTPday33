import { FormBuilder } from "@angular/forms"
export interface Task{
    task: string
    priority: string
}

export interface Todo {
    name: string
    email: string
    // changePriority: (pri: number) => void // this is a lambda expression (method changePriority takes in a number and returns nothing)
    tasks: Task[]
    // comments?: string // ? is used to show that this is an optional field
    
} 