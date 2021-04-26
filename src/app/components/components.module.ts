import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EnderecoComponent } from './endereco/endereco.component';
import { DocumentoComponent } from './documento/documento.component';
import { DetalhePedidoComponent } from './detalhe-pedido/detalhe-pedido.component';
import { PipesModule } from '../pipes/pipes.module';
import { CartaoComponent } from './cartao/cartao.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    EnderecoComponent, 
    DocumentoComponent,
    DetalhePedidoComponent,
    CartaoComponent,
  ],
  imports: [
    CommonModule,
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
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    PipesModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    CartaoComponent,
    DocumentoComponent,
    EnderecoComponent,
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
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatAutocompleteModule,
    PipesModule, 
    DetalhePedidoComponent,
  ]
})
export class ComponentsModule { }
