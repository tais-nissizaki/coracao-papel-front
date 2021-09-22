import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  formAlterarSenha!: FormGroup;
  constructor(
    formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private authStorageService: AuthStorageService
  ) {
    this.formAlterarSenha = formBuilder.group({
      senhaAntiga: [null, Validators.required],
      senha: [null, Validators.required],
      confirmacaoSenha: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  alterarSenha() {
    if (this.formAlterarSenha.valid) {
      this.clienteService.alterarSenha(this.formAlterarSenha.value)
        .subscribe(retorno => {
          if (retorno && retorno.startsWith('Erro')) {
            alert(retorno);
          } else {
            this.authStorageService.alterarSenhaAutenticacao(this.formAlterarSenha.value.senha);
            alert('Senha alterada com sucesso');
          }
        })
    }
  }

}
