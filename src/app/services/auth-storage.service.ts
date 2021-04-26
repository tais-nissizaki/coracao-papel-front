import { Injectable } from '@angular/core';

const chaveArmazenamentoAutenticacao = 'dadosAutenticacao';

// 60 segundos em milisegundos
const tempoExpiracao = 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  constructor() { }
  // armaz: string = '';
  guardarDadosAutenticacao(dadosUsuario: DadosUsuario, login: Login | LoginAdministrador) {
    let dadosAutenticacao: InformacaoAutenticao;
    if('email' in login) {
      dadosAutenticacao = {
        ...dadosUsuario,
        expiracao: this.obterExpiracao(),
        basicToken: btoa(`${login.email}:${login.senha}`)
      }
    } else if('usuario' in login) {
      dadosAutenticacao = {
        ...dadosUsuario,
        expiracao: this.obterExpiracao(),
        basicToken: btoa(`${login.usuario}:${login.senha}`)
      }
    }

    if(dadosAutenticacao) {
      // this.armaz = btoa(JSON.stringify(dadosAutenticacao)); //F5 desloga o usuario
      // localStorage.setItem(chaveArmazenamentoAutenticacao, btoa(JSON.stringify(dadosAutenticacao))); // Só Desloga quando clica em SAIR
      sessionStorage.setItem(chaveArmazenamentoAutenticacao, btoa(JSON.stringify(dadosAutenticacao))); // F5 não desloga usuário, mas nova aba não estará logada 
    }
  }

  obterDadosAutenticacao(): InformacaoAutenticao | null {
    if(sessionStorage.getItem(chaveArmazenamentoAutenticacao)) {
      const jsonDadosAutenticacao =  atob(sessionStorage.getItem(chaveArmazenamentoAutenticacao));
      const dadosAutenticacao: InformacaoAutenticao = JSON.parse(jsonDadosAutenticacao);
      dadosAutenticacao.expiracao = new Date(dadosAutenticacao.expiracao);
      return dadosAutenticacao;
    }
    return null;
  }

  verificarExpiracao(): boolean {
    // return new Date().getTime() <= (this.obterDadosAutenticacao()?.expiracao ? this.obterDadosAutenticacao().expiracao.getTime() : 0);
    return this.obterDadosAutenticacao() != null && this.obterDadosAutenticacao() != undefined
  }

  ehUsuarioCliente() {
    return this.verificarExpiracao() && this.obterDadosAutenticacao()?.permissoes.includes('CLIENTE');
  }

  ehUsuarioAdmin() {
    return this.verificarExpiracao() && this.obterDadosAutenticacao()?.permissoes.includes('ADMIN');
  }

  logout(): void {
    sessionStorage.removeItem(chaveArmazenamentoAutenticacao)
  }

  obterExpiracao(): Date {
    const atual = new Date().getTime();
    const novo = atual + tempoExpiracao;
    return new Date(novo);
  }
 
}
