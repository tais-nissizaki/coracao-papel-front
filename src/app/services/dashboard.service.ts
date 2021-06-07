import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
  ) { }

  analiticoPorProduto(dataInicial: Date, dataFinal: Date): Observable<ItemDasboard[]> {
    let params = {
      dataInicial: dataInicial.toISOString(),
      dataFinal: dataFinal.toISOString(),
    };
    return this.http.get<ItemDasboard[]>('http://localhost:8083/dashboard/produtos', {
      params: params,
      headers: {
        'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
      },
    });
  }
  analiticoPorCategoria(dataInicial: Date, dataFinal: Date): Observable<ItemDasboard[]> {
    let params = {
      dataInicial: dataInicial.toISOString(),
      dataFinal: dataFinal.toISOString(),
    };
    return this.http.get<ItemDasboard[]>('http://localhost:8083/dashboard/categorias', {
      params: params,
      headers: {
        'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
      },
    });
  }
}
