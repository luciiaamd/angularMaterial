import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    FormsModule,
    MatButton
  ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  images = [
    { src: 'assets/imagenes/imagen_boda.jpg', description: 'Imagen boda'},
    { src: 'assets/imagenes/imagen1.png', description: 'Imagen lienzo'},
    { src: 'assets/imagenes/CAME.png', description: 'Análisis CAME'},
    { src: 'assets/imagenes/DAFO.png', description: 'Análisis DAFO'}
  ];

  searchTerm: string = '';

  constructor(public dialog: MatDialog) {}

  openImageModal(image: any): void {
    this.dialog.open(ImageModalComponent, {
      data: image
    });
  }
  openAddImageModal(): void {
    const dialogRef = this.dialog.open(AddImageModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.images.push(result);
      }
    });
  }
  filteredImages() {
    return this.images.filter(image =>
      image.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}

@Component({
  selector: 'app-image-modal',
  template: `
    <div mat-dialog-content>
      <img [src]="data.src" alt=" " style="width: 100%;">
    </div>`,
  imports: [
    MatDialogContent
  ],
  standalone: true
})
export class ImageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-add-image-modal',
  template: `
    <h1 mat-dialog-title>Añadir Imagen</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="URL de la imagen" [(ngModel)]="newImage.src">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Descripción" [(ngModel)]="newImage.description">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button (click)="onAdd()">Añadir</button>
    </div>`,
  standalone: true,
  imports: [FormsModule, MatDialogTitle, MatFormField, MatDialogContent, MatInput, MatDialogActions, MatButton]
})
export class AddImageModalComponent {
  newImage = { src: '', description: '' };

  constructor(public dialogRef: MatDialogRef<AddImageModalComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.newImage);
  }
}


