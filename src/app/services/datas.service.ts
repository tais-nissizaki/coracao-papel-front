import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  formatarData(data: Date) {
    if(data) {

      let dataFormatada = '';
      if(data.getDate() < 10) {
        dataFormatada += `0`;
      }
      dataFormatada += `${data.getDate()}/`;
      if(data.getMonth() <=11) {
        dataFormatada += `0`;
      }
      dataFormatada += `${data.getMonth() + 1}/${data.getFullYear()}`;
      return dataFormatada;
    }
    return null;
  }

  formatarDataEHora(data: Date) {
    if(data) {
      let dataFormatada = '';
      if(data.getDate() < 10) {
        dataFormatada += `0`;
      }
      dataFormatada += `${data.getDate()}/`;
      if(data.getMonth() <=11) {
        dataFormatada += `0`;
      }
      dataFormatada += `${data.getMonth() + 1}/${data.getFullYear()} `;
      
      if(data.getHours() < 10) {
        dataFormatada += `0`;
      }
      dataFormatada += `${data.getHours()}:`;
      if(data.getMinutes() < 10) {
        dataFormatada += `0`;
      }
      dataFormatada += `${data.getMinutes()}:`;
      if(data.getSeconds() < 10) {
        dataFormatada += `0`;
      }
      dataFormatada += `${data.getSeconds()}`;
    
      return dataFormatada;
    }
    return null;
  }

}