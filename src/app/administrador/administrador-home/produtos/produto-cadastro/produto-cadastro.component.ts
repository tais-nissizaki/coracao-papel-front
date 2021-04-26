import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto.service';
import { CategoriaProdutoService }from '../../../../services/categoria-produto.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  gruposPrecificacao: GrupoPrecificacao[] = [];
  cadastroProduto: Produto = {
    titulo: '',
    autor: '',
    categorias: [],
    ano: '',
    editora: '',
    edicao: '',
    isbn: '',
    numeroPagina: '',
    sinopse: '',
    altura: '',
    largura: '',
    peso: '',
    profundidade: '',
    codigoBarras: '',
    caminhoImagem: '',
    valor: 0

  };

  categorias: CategoriaProduto[] = [];

  id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private produtoSevice: ProdutoService,
    private categoriaProdutoService: CategoriaProdutoService,
  ) {

    this.cadastroForm = formBuilder.group({
      titulo: [null, [Validators.required]],
      grupoPrecificacao: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      ano: [null, [Validators.required]],
      editora: [null, [Validators.required]],
      edicao: [null, [Validators.required]],
      isbn: [null, [Validators.required]],
      numeroPaginas: [null, [Validators.required]],
      sinopse: [null, [Validators.required]],
      altura: [null, [Validators.required]],
      largura: [null, [Validators.required]],
      peso: [null, [Validators.required]],
      profundidade: [null, [Validators.required]],
      codigoBarras: [null, [Validators.required]],
      valor: [null]
    });
  }

  ngOnInit(): void {
    // this.produtoSevice.obterGrupoPrecificacao().subscribe((grupoPrecificacao) => {
    //   this.gruposPrecificacao = grupoPrecificacao;
    // });
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.cadastroProduto.id = Number(params.get('id'));
      }
    })
    this.gruposPrecificacao=this.produtoSevice.obterGrupoPrecificacao();
    this.categorias = this.categoriaProdutoService.obterCategoriasProduto();

  }

  grupoPrecificacaoEquals(option, value): boolean {
    return value && option.id == value.id;
  }

  cancelar() {
    this.location.back();
  }

  salvarProduto() {
    this.cadastroProduto = {
      ...this.cadastroProduto,
      ...this.cadastroForm.value
    }
    console.log(this.cadastroProduto);
    // this.produtoSevice.alterarProduto(this.cadastroProduto).subscribe((resultado) => {
    //   console.log(resultado);
    //   alert(resultado);
    //   if(!`${resultado}`.startsWith('Erro: ')) {
    //     this.router.navigateByUrl('/administrador/produtos').then(value => console.log).catch(err => console.error);
    //   }
    // });
  }

  categoriaEquals(option, value): boolean {
    return value && option.id == value.id;
  }


}
