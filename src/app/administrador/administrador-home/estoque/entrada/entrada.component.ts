import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { FornecedorService } from '../../../../services/fornecedor.service';
import { ProdutoService } from '../../../../services/produto.service';
import { CompraService } from '../../../../services/compra.service';


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

  itemsAdicionados: ItemCompra[] = [];

  colunasItemEstoque = ['produto', 'grupo_precificacao', 'percentual', 'quantidade', 'valor', 'acao']

  @Output() cancelarEntrada = new EventEmitter();

  constructor(
    private compraService: CompraService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    formBuilder: FormBuilder
  ) {
    this.formEstoque = formBuilder.group({
      produto: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      valorCompra: [null, [Validators.required]]
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
    if(!this.formFornecedor.value.fornecedor || !this.formFornecedor.value.fornecedor.id) {
      this.formFornecedor.get('fornecedor').setErrors({'required': 'Selecione um fornecedor.'})
      this.formFornecedor.get('fornecedor').markAllAsTouched();
    } else if(!this.itemsAdicionados || this.itemsAdicionados.length <= 0) {
      this.formEstoque.get('produto').setErrors({'item-nao-informado':'q'});
      this.formEstoque.get('quantidade').setErrors({'':''});
      this.formEstoque.get('valorCompra').setErrors({'':''});
      this.formEstoque.markAllAsTouched();
    } else {
      this.compraService.efetivarCompra({
        fornecedor: this.formFornecedor.value.fornecedor,
        itensCompra: this.itemsAdicionados
      })
      .subscribe(retorno => {
        if(retorno && retorno.includes('Erro:')) {
          alert(retorno)
        } else {
          alert('Compra registrada com sucesso.');
          this.formEstoque.reset();
          this.formFornecedor.reset();
          this.itemsAdicionados = [];
        }
      },
      (err) => {
        console.log(err);
        alert('Ocorreu uma falha ao efetuar a entrada em estoque dos produtos')
      });
    }
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

  removerItem(itemEstoque: ItemCompra) {
    this.itemsAdicionados = this.itemsAdicionados.filter((item, index) => this.itemsAdicionados.indexOf(itemEstoque) != index)
  }

}
