import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-grupo-precificacao',
  templateUrl: './grupo-precificacao.component.html',
  styleUrls: ['./grupo-precificacao.component.css']
})
export class GrupoPrecificacaoComponent implements OnInit {

  gruposPrecificacao: GrupoPrecificacao[] = [];
  colunas = ['nomeGrupo', 'margemLucro', 'acoes']
  modoEdicao = false;

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.gruposPrecificacao = this.produtoService.obterGrupoPrecificacao();
  }

}
