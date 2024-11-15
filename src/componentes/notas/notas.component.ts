import { Component } from '@angular/core';
import {MatTab} from '@angular/material/tabs';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {CdkTableDataSourceInput} from '@angular/cdk/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

interface Alumno {
  nombre: string;
  nota: number;
  estado: string;
}

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [
    MatTab,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatLabel,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatIcon,
    MatFabButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    FormsModule
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})

export class NotasComponent {
  // Se definen las columnas que se muestran en la tabla
  columnas: string[] = ['nombre', 'nota', 'estado'];
  // Se crea una instancia de la tabla con datos iniciales
  dataSource = new MatTableDataSource<Alumno>([
    { nombre: 'Juan', nota: 8, estado: this.calcularEstado(8) },
    { nombre: 'Maria', nota: 5, estado: this.calcularEstado(5) },
    { nombre: 'Pedro', nota: 3, estado: this.calcularEstado(3) }
  ]);

  // Es el objeto en el que se maneja los valores de los filtros
  filterValues = {
    nombre: '',
    estado: ''
  };

  nuevoNombre: string = '';
  nuevaNota: number = 0;

  filtroNombre(event: Event) {
    // Obtiene el valor que hay en el input y lo convierte a minúsculas
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // Actualiza el valor de nombre en el objeto creado anteriormente
    this.filterValues.nombre = filterValue;
    // Aplica el filtro
    this.filtro();
  }

  filtroEstado(event: MatSelectChange) {
    // Obtiene el valor seleccionado y lo convierte a minúsculas
    const filterValue = event.value.trim().toLowerCase();
    // Actualiza el valor del estado en el objeto creado anteriormente
    this.filterValues.estado = filterValue;
    // Aplica el filtro
    this.filtro();
  }

  filtro() {
    // filterPredicate define la logica del filtrado
    // Recibe dos argumentos data: que es la fila de datos y filter que es el valor del filtro
    this.dataSource.filterPredicate = (data: Alumno, filter: string) => {
      // Convierte el filtro de string a objeto
      // JSON.parse convierte de texto a objeto
      const filterValues = JSON.parse(filter);
      // Comprueba si el nombre del alumno incluye el texto del filtro del nombre
      // Si el estado del alumno coincide con el filtro del estado
      return data.nombre.toLowerCase().includes(filterValues.nombre) &&
        (filterValues.estado === '' || data.estado.toLowerCase() === filterValues.estado);
    };
    // Convertimos el objeto de filtros a texto y se le aplica a la tabla
    // JSON.stringify convierte de objeto a texto
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  calcularEstado(nota: number): string {
    if (nota >= 5) {
      return 'Aprobado';
    } else {
      return 'Suspenso';
    }
  }

  agregarEstudiante() {
    const nuevoAlumno: Alumno = {
      nombre: this.nuevoNombre,
      nota: this.nuevaNota,
      estado: this.calcularEstado(this.nuevaNota)
    };
    this.dataSource.data = [...this.dataSource.data, nuevoAlumno];
    this.nuevoNombre = '';
    this.nuevaNota = 0;
  }



}

