import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(
    private http: HttpClient,) {
  }

  obterTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>('http://localhost:8083/tipos-documento');
  }

}