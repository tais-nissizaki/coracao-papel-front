import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto.service';
import { CategoriaProdutoService }from '../../../../services/categoria-produto.service';
import { GrupoPrecificacaoService }from '../../../../services/grupo-precificacao.service';
import { pipe } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

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

  testeImg: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private produtoSevice: ProdutoService,
    private categoriaProdutoService: CategoriaProdutoService,
    private grupoPrecificacaoService: GrupoPrecificacaoService,
  ) {
    this.cadastroForm = formBuilder.group({
      titulo: [null, [Validators.required]],
      grupoPrecificacao: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      categorias: [null, [Validators.required]],
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
      // valor: [null]
    });
  }

  ngOnInit(): void {
    this.grupoPrecificacaoService.obterGruposPrecificacao().subscribe(gruposPrecificacao => this.gruposPrecificacao = gruposPrecificacao);
    this.categorias = this.categoriaProdutoService.obterCategoriasProduto();
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.cadastroProduto.id = Number(params.get('id'));
        this.produtoSevice.obterProduto(this.cadastroProduto.id)
          .subscribe(produtos => {
            console.log(produtos[0])
            let produto: Produto = produtos[0];
            this.cadastroProduto = {
              ...produto,
              ano: produto.anoEdicao,
              altura: produto.dimensao.altura ? (''+produto.dimensao.altura).replace('.', ',') : produto.dimensao.altura,
              largura: produto.dimensao.largura ? (''+produto.dimensao.largura).replace('.', ',') : produto.dimensao.largura,
              profundidade: produto.dimensao.profundidade ? (''+produto.dimensao.profundidade).replace('.', ',') : produto.dimensao.profundidade,
              peso: produto.dimensao.peso ? (''+produto.dimensao.peso).replace('.', ',') : produto.dimensao.peso,
            }
            this.cadastroForm.reset(
              this.cadastroProduto
            );
          });
      }
    })
  }

  grupoPrecificacaoEquals(option, value): boolean {
    return value && option.id == value.id;
  }

  cancelar() {
    this.location.back();
  }

  salvarProduto() {
    this.cadastroForm.markAllAsTouched();
    if (this.cadastroForm.valid) {
      this.cadastroProduto = {
        ...this.cadastroProduto,
        ...this.cadastroForm.value
      }
      this.produtoSevice.salvarProduto(this.cadastroProduto).subscribe((resultado) => {
        console.log(resultado);
        alert(resultado);
        if(!`${resultado}`.startsWith('Erro: ')) {
          this.router.navigateByUrl('/administrador/produtos').then(value => console.log).catch(err => console.error);
        }
      });
    }
  }

  selectFile(files: any) {
    console.log(files)
    console.log(files.files[0])
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files.files[0]);
    fileReader.onload = () => {
      //me.modelvalue = reader.result;
      this.cadastroProduto.imageBase64 = ''+fileReader.result;
    };
    fileReader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  get imageBase64EncodedString(): string {
    if(!this.cadastroProduto || !this.cadastroProduto.imageBase64) {
      return '';
    } else if(this.cadastroProduto.imageBase64.includes('data:image') && this.cadastroProduto.imageBase64.includes('base64')) {
      return this.cadastroProduto.imageBase64;
    } else {
      return 'data:image/jpeg;base64,'+this.cadastroProduto.imageBase64;
    }
  }

  categoriaEquals(option, value): boolean {
    return value && option.id == value.id;
  }


}
