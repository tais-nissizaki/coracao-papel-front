import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enderecoCompleto'
})
export class EnderecoCompletoPipe implements PipeTransform {

  transform(endereco: Endereco): string {
    if(endereco) {
      let enderecoCompleto = '';
      if(endereco.tipoLogradouro && endereco.tipoLogradouro.descricao) {
        enderecoCompleto += endereco.tipoLogradouro.descricao + ' ';
      }
      enderecoCompleto += endereco.logradouro;
      enderecoCompleto += ', ' + endereco.numero;
      if(endereco.complemento && endereco.complemento.trim().length > 0) {
        enderecoCompleto += ', ' + endereco.complemento;
      }
      if(endereco.bairro && endereco.bairro.trim().length > 0) {
        enderecoCompleto += ' - ' + endereco.bairro;
      }
      if(endereco.cidade) {
        enderecoCompleto += ' - ' + endereco.cidade.descricao;
      }
      if(endereco.estado) {
        enderecoCompleto += '-' + endereco.estado.descricao;
      } else if (endereco.cidade && endereco.cidade.estado) {
        enderecoCompleto += '-' + endereco.cidade.estado.descricao;
      }
      return enderecoCompleto;
    } else {
      return '';
    }
  }

}
