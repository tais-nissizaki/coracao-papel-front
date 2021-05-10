import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
  ) { }

  obterTiposCliente(): Observable<TipoCliente[]> {
    return this.http.get<TipoCliente[]>('http://localhost:8083/tipos-cliente');
  }

  obterGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>('http://localhost:8083/generos');
  }

  obterTiposTelefone(): Observable<TipoTelefone[]> {
    return this.http.get<TipoTelefone[]>('http://localhost:8083/tipos-telefone');
  }

  salvarCliente(cadastroCliente: Cliente): Observable<any> {
    console.log('cadastroCliente', cadastroCliente)
    const cliente = { 
      ...cadastroCliente,
      usuario: {
        ...cadastroCliente.usuario,
        nomeUsuario: cadastroCliente.email,
      },
      ativo: true,
      telefones: [
        {
          numero: cadastroCliente.telefone,
          tipoTelefone: cadastroCliente.tipoTelefone
        }
      ],
      enderecos: cadastroCliente.enderecos.map(endereco => {
        return {
          ...endereco,
        }
      }),
      documentos: cadastroCliente.documentos,
      cartoes: cadastroCliente.cartoes.map(cartao => {
        return {
          ...cartao,
          dataValidade: this.formatarDataValidadeCartao(cartao.validade)
        }
      })
    };
    return this.http.post('http://localhost:8083/clientes', cliente,
    {responseType: 'text'});
  }

  private formatarDataValidadeCartao(validade: string) {
    if(validade) {
      const v = validade.replace(/\D/g, '');
      if(v.length > 6) {
        return v.substring(0, 4) + '-' +v.substring(4, 6) + '-01';
      } else {
        return validade.substring(2) + '-' +validade.substring(0,2) + '-01';
      }

    } else {
      return validade;
    }
  }

  alterarCliente(cadastroCliente: Cliente): Observable<any> {
    console.log(cadastroCliente);
    const cliente = { 
      ...cadastroCliente,
      usuario: {
        ...cadastroCliente.usuario,
        nomeUsuario: cadastroCliente.email,
      },
      ativo: true,
      telefones: [
        {
          numero: cadastroCliente.telefone,
          tipoTelefone: cadastroCliente.tipoTelefone
        }
      ],
      enderecos: cadastroCliente.enderecos.map(endereco => {
        return {
          ...endereco,
        }
      }),
      documentos: cadastroCliente.documentos,
      cartoes: cadastroCliente.cartoes.map(cartao => {
        return {
          ...cartao,
          dataValidade: this.formatarDataValidadeCartao(cartao.validade || cartao.dataValidade)
        }
      })
    };
    return this.http.put('http://localhost:8083/clientes/'+cadastroCliente.id, cliente,
    {responseType: 'text'});
  }

  
  pesquisarCliente(filtroCliente: Cliente): Observable<Cliente[]> {
    if(filtroCliente.nome) {
      return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar/nome/' + filtroCliente.nome);
    } else if(filtroCliente.id) {
        return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar/id/' + filtroCliente.id, {
          headers: {
            'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
          },
        });
    }
  }
  
  inativarCliente(cliente: Cliente): Observable<any> {
      return this.http.put('http://localhost:8083/clientes/inativar/' + cliente.id, 
        {},
        { responseType: 'text'});
  }
  
  ativarCliente(cliente: Cliente): Observable<any> {
    return this.http.put('http://localhost:8083/clientes/ativar/' + cliente.id, 
      {},
      { responseType: 'text'});
  }

  obterCadastroClienteLogado() {
    return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar/id/' + this.authStorageService.obterDadosAutenticacao().idCliente, {
          headers: {
            'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
          },
        });
  }

}