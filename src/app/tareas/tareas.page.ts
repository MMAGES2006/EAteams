import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TaskService } from '../task.service'; // Ruta del servicio
import { Task } from '../task.service'; // Ruta del modelo

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TareasPage implements OnInit {

  tasks: Task[] = [];  // Lista de tareas
  currentTask: Task | null = null;  // Tarea que estamos editando
  newTaskTitle: string = '';  // Título de la nueva tarea
  isEditing: boolean = false;  // Indica si estamos en modo edición
  isAdding: boolean = false;  // Indica si estamos en modo agregar

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Cargar las tareas desde Firebase
    this.taskService.getTask().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Agregar una nueva tarea
  addTask(): void {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = { title: this.newTaskTitle, completed: false };
      this.taskService.addTask(newTask).then(() => {
        this.isAdding = false;
        this.newTaskTitle = '';  // Limpiar el campo de entrada
      }).catch((error) => {
        console.error('Error adding task:', error);
      });
    }
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.currentTask = { ...task };  // Asegúrate de que currentTask esté siempre definido
    if (!this.currentTask) {
      return;  // Si currentTask es null, evitar la edición
    }
  }

  // Guardar los cambios de la tarea editada
  saveTask(): void {
    if (this.currentTask?.id) {
      this.taskService.updateTask(this.currentTask.id, {
        title: this.currentTask.title,
        completed: this.currentTask.completed
      }).then(() => {
        this.isEditing = false;
        this.currentTask = null;  // Limpiar la tarea actual
      }).catch((error) => {
        console.error('Error saving task:', error);
      });
    }
  }

  // Eliminar una tarea
  deleteTask(id: string): void {
    this.taskService.deleteTask(id).then(() => {
      console.log('Task deleted');
    }).catch((error) => {
      console.error('Error deleting task:', error);
    });
  }

  // Cancelar la edición o la adición
  cancel(): void {
    this.isEditing = false;
    this.isAdding = false;
    this.currentTask = null;
    this.newTaskTitle = '';
  }

  // Cambiar el estado de completada de la tarea
  toggleCompletion(task: Task): void {
    this.taskService.updateTask(task.id!, { completed: !task.completed })
      .catch((error) => console.error('Error toggling task completion:', error));
  }
}