import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentoService } from '../../../../../services/documento.service';
import { DatasService } from '../../../../../services/datas.service';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css'],

})
export class DocumentoComponent implements OnInit {
  colunasExibidas: string[] = ['nomeTipoDocumento', 'codigo', 'validade', 'acoes'];
  @Input() documentos: Documento[] = [];
  @Output("sincronizarDocumentos") sincronizarDocumentos = new EventEmitter();

  documentoCadastroFormGroup: FormGroup;
  tiposDocumento: TipoDocumento[] = [];
  
  editMode = false;
  currentIndex = 0;

  constructor(
    formBuilder: FormBuilder,
    private documentoService: DocumentoService,
    private datasService: DatasService) {
    this.documentoCadastroFormGroup = formBuilder.group({
      tipoDocumento: [null, [Validators.required]],
      codigo: ['', [Validators.required]],
      validade: [''],
    });
  }

  ngOnInit(): void {
    this.documentoService.obterTiposDocumentos()
      .subscribe(
        (tiposDocumento) => {
          this.tiposDocumento = tiposDocumento;
          this.currentIndex = -1
          this.preencherTipoDocumento();
        },
        (error) => {
          console.error('ocorreu um erro ao solicitar tipos de documentos', error);
        }
      );
  }

  validarCamposFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validarCamposFormulario(control);
      }
    });
  }

  private preencherTipoDocumento() {
    this.documentos = this.documentos.map(documento => {
      return {
        ...documento,
        codigo: documento.codigo
      };
    })
  }

  tipoDocumentoEquals(option, value): boolean {
    return option.id == value.id;
  }

  novo() {
    this.editMode = true;
    this.currentIndex = -1;
    this.documentoCadastroFormGroup.clearValidators();
    this.documentoCadastroFormGroup.reset({
      tipoDocumento: null,
      codigo: '',
      validade: '',
    });
  }

  cancelar() {
    this.editMode = false;
    this.currentIndex = -1;
  }

  adicionarDocumento($event) {
    if(this.documentoCadastroFormGroup.valid) {
      
      if (this.currentIndex > -1) {
        this.documentos = [
          ...this.documentos.filter(documentoLista => this.documentos.indexOf(documentoLista) != this.currentIndex),
          {
            id: this.documentos.find(documentoLista => this.documentos.indexOf(documentoLista) == this.currentIndex).id,
            tipoDocumento: this.documentoCadastroFormGroup.value.tipoDocumento,
            codigo: this.documentoCadastroFormGroup.value.codigo,
            validade: this.documentoCadastroFormGroup.value.validade
          }
        ];
      } else {
        // this.datasService.formatarData(this.documentoCadastroFormGroup.value.validade);
        const novoDocumento = {
          tipoDocumento: this.documentoCadastroFormGroup.value.tipoDocumento,
          codigo: this.documentoCadastroFormGroup.value.codigo,
          validade: this.documentoCadastroFormGroup.value.validade
        };
        this.documentos = [
          ...this.documentos,
          novoDocumento
        ];
      }
      this.editMode = false;
      this.currentIndex = -1;
      this.sincronizarDocumentos.emit(this.documentos);
    } else {
      this.validarCamposFormulario(this.documentoCadastroFormGroup)
    }
  }

  removerDocumento(documento) { 
    this.documentos = this.documentos.filter(documentoDaLista => this.documentos.indexOf(documentoDaLista) != this.documentos.indexOf(documento));
    this.sincronizarDocumentos.emit(this.documentos);
  }


  private obterNomeTipoDocumento(id: number) {
    for(let i=0; i < this.tiposDocumento.length; i++) {
      if(this.tiposDocumento[i].id == id) {
        return this.tiposDocumento[i].nome;
      }
    }
    return '';
  }

  editarDocumento(documento, $event) {
    $event.preventDefault();
    this.documentoCadastroFormGroup.reset(documento);
    this.editMode = true;
    this.currentIndex = this.documentos.indexOf(documento);
  }

}
