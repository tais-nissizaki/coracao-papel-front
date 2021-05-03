import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-entrada-estoque',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  formEstoque!: FormGroup;
  formFornecedor!: FormGroup;
  produtosFiltrados: Observable<Produto[]>;

  itemsAdicionados: ItemEntradaEstoque[] = [];

  colunasItemEstoque = ['produto', 'quantidade', 'valor', 'acao']

  @Output() cancelarEntrada = new EventEmitter();

  constructor(
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    formBuilder: FormBuilder
  ) {
    this.formEstoque = formBuilder.group({
      produto: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      valor: [null, [Validators.required]]
    })
    this.formFornecedor = formBuilder.group({
      fornecedor: [null],
    })

    this.produtosFiltrados = this.formEstoque.get('produto').valueChanges
      .pipe(
        filter(searchTerm => searchTerm && searchTerm.length > 2),
        debounceTime(500),
        switchMap(value => this.produtoService.filtrarProdutos(value))
      );
  }

  ngOnInit(): void {
    this.fornecedorService.obterFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
  }
  
  cancelar() {
    this.cancelarEntrada.emit();
  }

  efetivarEntradaEstoque() {
    
  }

  fornecedorEquals(value, option) {
    return option && value.cnpj == option.cnpj
  }

  produtoEquals(value, option) {
    console.log(option);
    return value.cnpj == option.cnpj
  }

  displayFn(user: Produto): string {
    return user && user.titulo ? user.titulo : '';
  }

  adicionarItemCompra() {
    this.formEstoque.markAllAsTouched()
    if (!this.validarProduto(this.formEstoque.get('produto').value)) {
      this.formEstoque.get('produto').setErrors({
        'required': 'Selecione um produto válido'
      })
    }
    if (this.formEstoque.valid) {
      this.itemsAdicionados = [
        ...this.itemsAdicionados,
        this.formEstoque.value
      ]
      this.formEstoque.reset();
      this.formEstoque.markAsPristine();
    }
  }

  validarProduto(produto) {
    return produto && produto.titulo && produto.id;
  }

  removerItem(itemEstoque: ItemEntradaEstoque) {
    this.itemsAdicionados = this.itemsAdicionados.filter((item, index) => this.itemsAdicionados.indexOf(itemEstoque) != index)
  }

}
