import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): string {
    if (!value)  return '';
    const [type] = args;
    let somenteNumeros = `${value}`.replace(/[^\d]/g, "");;
    if (type == 'cnpj') {
      if(somenteNumeros.length < 14) {
        somenteNumeros = somenteNumeros.padStart(14, '0');
      }
      return somenteNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    if(somenteNumeros.length < 11) {
      somenteNumeros = somenteNumeros.padStart(14, '0');
    }
    return somenteNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

  }

}
