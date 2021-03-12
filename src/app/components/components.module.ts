import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule }from '@angular/material/card';
import { MatButtonModule }from '@angular/material/button';
import { MatFormFieldModule }from '@angular/material/form-field';
import { MatInputModule }from '@angular/material/input';
import { MatSelectModule }from '@angular/material/select';
import { MatDatepickerModule }from '@angular/material/datepicker';
import { MatDividerModule }from '@angular/material/divider';
import { MatTableModule }from '@angular/material/table';
import { MatMenuModule }from '@angular/material/menu';

@NgModule({
  declarations: [],
  // imports: [
  //   CommonModule,
  //   MatToolbarModule,
  //   MatIconModule,
  //   MatSidenavModule,
  //   MatCardModule,
  //   MatButtonModule,
  //   MatFormFieldModule,
  //   ReactiveFormsModule,
  //   FormsModule,
  //   MatInputModule,
  //   MatSelectModule,
  //   MatDatepickerModule,
  //   MatNativeDateModule,
  //   MatDividerModule,
  //   MatTableModule,
  //   MatMenuModule,
  // ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
  ]
})
export class ComponentsModule { }
