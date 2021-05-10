import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoPrecificacaoService {

  constructor(
    private http: HttpClient,
  ) { }

  obterGruposPrecificacao(): Observable<GrupoPrecificacao[]> {
    return this.http.get<GrupoPrecificacao[]>('http://localhost:8083/grupos-precificacao');
  }
}
