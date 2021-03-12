import { Pipe, PipeTransform } from '@angular/core';
import { DatasService } from '../services/datas.service';
@Pipe({
  name: 'FormatarData',
})
export class FormatarDataPipe implements PipeTransform {

  constructor(private datasService: DatasService) { }

  transform(value: Date): string {
    return this.datasService.formatarData(value);
  }
}