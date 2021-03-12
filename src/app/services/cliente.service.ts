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

  salvarCliente(cadastroCliente: CadastroCliente): Observable<any> {
    console.log(cadastroCliente);
    return this.http.post('http://localhost:8083/clientes', {
      nome: cadastroCliente.nome,
      ativo: true,
      enderecos: cadastroCliente.enderecos.map(endereco => {
        return {
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cidade: {
            id: endereco.cidade
          },
          tipoEndereco: {
            id: endereco.tipoEndereco
          }
        }
      }),
      documentos: cadastroCliente.documentos,
    },
    {responseType: 'text'});
  }

  alterarCliente(cadastroCliente: CadastroCliente): Observable<any> {
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

  
  pesquisarCliente(filtroCliente: CadastroCliente): Observable<CadastroCliente[]> {
    if(filtroCliente.nome) {
      return this.http.get<CadastroCliente[]>('http://localhost:8083/clientes/pesquisar/nome/' + filtroCliente.nome);
    } else if(filtroCliente.id) {
      return this.http.get<CadastroCliente[]>('http://localhost:8083/clientes/pesquisar/id/' + filtroCliente.id);
    }
  }
  
  inativarCliente(cliente: CadastroCliente): Observable<any> {
      return this.http.put('http://localhost:8083/clientes/inativar/' + cliente.id, 
        {},
        { responseType: 'text'});
  }
  
  ativarCliente(cliente: CadastroCliente): Observable<any> {
    return this.http.put('http://localhost:8083/clientes/ativar/' + cliente.id, 
      {},
      { responseType: 'text'});
  }

}