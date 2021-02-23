import { AbstractControl } from '@angular/forms';

export const VerificaEnderecoCobrancaValidation = (control: AbstractControl) => {
  return control.value && control.value.length && ![...control.value].find((endereco) => endereco.tipoEndereco == 'COBRANCA') ? null : {
    naoExisteCobranca: true
  }
}