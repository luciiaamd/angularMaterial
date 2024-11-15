import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButton} from '@angular/material/button';
import {NotasComponent} from '../componentes/notas/notas.component';
import {GaleriaComponent} from '../componentes/galeria/galeria.component';
import {TareasComponent} from '../componentes/tareas/tareas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, NotasComponent, GaleriaComponent, TareasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularMateria';
}
