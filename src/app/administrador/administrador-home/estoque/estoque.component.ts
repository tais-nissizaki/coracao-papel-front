import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { ProdutoService } from 'src/app/services/produto.service';
import { FornecedorService } from "../../../services/fornecedor.service";

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  radioSelection: number = 0;
  selectedOption: number = -1;

  constructor(
    private produtoService: ProdutoService,
  ) {
  }

  ngOnInit(): void {
  }

  fornecedorEquals(value, option) {
    console.log(option);
    return value.cnpj == option.cnpj
  }

  produtoEquals(value, option) {
    console.log(option);
    return value.cnpj == option.cnpj
  }

  displayFn(user: Produto): string {
    return user && user.titulo ? user.titulo : '';
  }

  cancelar() {
    this.selectedOption = -1;
  }
}

