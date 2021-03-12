import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentoService } from '../../../services/documento.service';
import { DatasService } from '../../../services/datas.service';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css'],

})
export class DocumentoComponent implements OnInit {
  colunasExibidas: string[] = ['nomeTipoDocumento', 'codigo', 'validade', 'acoes'];
  documentos: Documento[] = [];
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
    })
  }

  ngOnInit(): void {
    this.documentoService.obterTiposDocumentos()
      .subscribe(
        (tiposDocumento) => {
          this.tiposDocumento = tiposDocumento;
        },
        (error) => {
          console.error('ocorreu um erro ao solicitar tipos de documentos', error);
        }
      );
  }
  tipoDocumentoEquals(option, value) {
    return value && option.id == value.id;
  }

  novo($event) {
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
      console.log(this.documentos);
      this.sincronizarDocumentos.emit(this.documentos);
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
