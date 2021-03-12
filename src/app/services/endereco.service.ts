import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) {

  }

  obterTiposEndereco(): Observable<TipoEndereco[]> {
    return this.http.get<TipoEndereco[]>('http://localhost:8083/tipos-endereco');
  }

  obterEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('http://localhost:8083/estados');
  }

  obterCidades(siglaEstado: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`http://localhost:8083/cidades/uf/${siglaEstado}`);
  }

  obterCidadePorID(idCidade: number): Observable<Cidade> {
    return this.http.get<Cidade>(`http://localhost:8083/cidades/id/${idCidade}`);
  }
}