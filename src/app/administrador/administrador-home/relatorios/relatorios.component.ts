import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  formTipoRelatorio: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formTipoRelatorio = formBuilder.group({
      tipoRelatorio: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    if (!this.router.url.endsWith('/relatorios') || !this.router.url.includes('/relatorios/')) {
      this.formTipoRelatorio.setValue({
        tipoRelatorio: this.router.url
      });
      this.formTipoRelatorio.markAsDirty();
      this.formTipoRelatorio.get('tipoRelatorio').markAsDirty();
    }
  }

  abrirRelatorio() { 
    this.formTipoRelatorio.markAsTouched();
    if(this.formTipoRelatorio.valid) {
      const url = this.formTipoRelatorio.get('tipoRelatorio').value;
      console.log(this.router.url, this.formTipoRelatorio.get('tipoRelatorio'))
      this.router.navigateByUrl(url);
    }
  }

}
