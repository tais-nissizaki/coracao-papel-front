import { Pipe, PipeTransform } from '@angular/core';
import { DatasService } from '../services/datas.service';
@Pipe({
  name: 'FormatarData',
})
export class FormatarDataPipe implements PipeTransform {

  constructor(private datasService: DatasService) { }

  transform(value: Date | string, attrs?: any): string | undefined {
    if (value) {
      let valorDate;
      if(typeof value == 'string') {
        valorDate = new Date(value);
      } else {
        valorDate = value;
      }
      if (attrs && attrs.length > 0 && attrs == 'com-hora') {
        return this.datasService.formatarDataEHora(valorDate);
      }
      return this.datasService.formatarData(valorDate);
    }
    return undefined;
  }
}