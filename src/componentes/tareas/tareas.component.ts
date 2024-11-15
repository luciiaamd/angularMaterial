import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CdkDropList,
    MatCardModule,
    NgForOf,
    CdkDrag
  ],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  newTask: string = '';
  pendingTasks: string[] = [];
  inProgressTasks: string[] = [];
  completedTasks: string[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.pendingTasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    // Permitir mover tareas entre columnas
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  deleteTask(event: CdkDragDrop<string[]>) {
    // Eliminar la tarea al soltarla en la zona de eliminación
    if (event.previousContainer.data) {
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }
}
