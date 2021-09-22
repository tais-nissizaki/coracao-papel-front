import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
import { map, mergeMap, tap } from 'rxjs/operators';

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
    if(typeof cadastroCliente.dataNascimento == 'string') {
      cadastroCliente.dataNascimento = new Date(cadastroCliente.dataNascimento);
    }
    const cliente = { 
      ...cadastroCliente,
      dataNascimento: cadastroCliente.dataNascimento,
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

  alterarDadosBasicosCliente(cadastroCliente: Cliente): Observable<string> {
    console.log('Alteração de dados básicos' , cadastroCliente);
    return this.pesquisarCliente({ id: cadastroCliente.id } as Cliente)
      .pipe(
        mergeMap(clientes => {
          const clienteAlteracao = { 
            ...clientes[0],
            ...cadastroCliente,
            usuario: {
              ...clientes[0].usuario,
              nomeUsuario: cadastroCliente.email,
            },
            ativo: true,
            telefones: [
              {
                numero: cadastroCliente.telefone,
                tipoTelefone: cadastroCliente.tipoTelefone
              }
            ],
            documentos: cadastroCliente.documentos,
          };
          return this.http.put(
            'http://localhost:8083/clientes/'+cadastroCliente.id, 
            clienteAlteracao,
            {responseType: 'text'}
          );
        }),
        
      );
  }
  
  pesquisarCliente(filtroCliente: Cliente): Observable<Cliente[]> {
    if(filtroCliente.id) {
        return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar/id/' + filtroCliente.id, {
          headers: {
            'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
          },
        });
    } else if(filtroCliente.nome || (filtroCliente.documentos && filtroCliente.documentos.length > 0)) {
      let params: HttpParams = new HttpParams();
      if(filtroCliente.nome) {
        params = params.append('nome', filtroCliente.nome)
      }
      if (filtroCliente.documentos && filtroCliente.documentos.length > 0 && filtroCliente.documentos[0].codigo) {
        params = params.append('cpf', filtroCliente.documentos[0].codigo)
      } 
      return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar', {
        params: params,
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
    // } else if(filtroCliente.nome) {
    //   const params = {
    //     nome: filtroCliente.nome,
    //     cpf: undefined,
    //   }
    //   const cpf = filtroCliente.documentos[0]?.codigo;
    //   if (filtroCliente.documentos && filtroCliente.documentos.length > 0) {
    //     params.cpf = filtroCliente.documentos[0].codigo;
    //   } 
    //   return this.http.get<Cliente[]>('http://localhost:8083/clientes/pesquisar/nome/' + filtroCliente.nome);
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
  alterarSenha(alterraSenha: AlterarSenha) {
    return this.http.put('http://localhost:8083/clientes/cliente/' + this.authStorageService.obterDadosAutenticacao().idCliente + '/alterar-senha', 
      alterraSenha, 
      {
        responseType: 'text',
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

}