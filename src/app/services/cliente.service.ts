import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,) {
  }

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
          cidade: {
            id: endereco.cidade
          },
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
    return validade.substring(2) + '-' +validade.substring(0,2) + '-01';
  }

  alterarCliente(cadastroCliente: Cliente): Observable<any> {
    console.log(cadastroCliente);
    return this.http.put('http://localhost:8083/clientes/'+cadastroCliente.id, {
      nome: cadastroCliente.nome,
      ativo: cadastroCliente.ativo,
      tipoCliente: cadastroCliente.tipoCliente,
      enderecos: cadastroCliente.enderecos,
      documentos: cadastroCliente.documentos,
    },
    {responseType: 'text'});
  }

  
  pesquisarCliente(filtroCliente: Cliente): Observable<Cliente[]> {
    if(filtroCliente.nome) {
      return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar/nome/' + filtroCliente.nome);
    } else if(filtroCliente.id) {
      return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar/id/' + filtroCliente.id);
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

}