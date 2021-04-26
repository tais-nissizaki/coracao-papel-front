import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from '../../services/auth-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(
    private authStorageService: AuthStorageService,
  ) { }

  ngOnInit(): void {
  }

  estaAutenticado(): boolean {
    const estaAutenticado = this.authStorageService.verificarExpiracao();
    if(!estaAutenticado) {
      this.authStorageService.logout();
    }
    return estaAutenticado;
  }

  logout() {
    this.authStorageService.logout();
  }
}
