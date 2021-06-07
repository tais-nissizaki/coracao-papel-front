import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from '../../services/auth-storage.service';

@Component({
  selector: 'app-administrador-home',
  templateUrl: './administrador-home.component.html',
  styleUrls: ['./administrador-home.component.css']
})
export class AdministradorHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authStorageService: AuthStorageService,
  ) { }

  ngOnInit(): void { }

  sair() {
    this.authStorageService.logout();
    this.router.navigateByUrl('/administrador/login');
  }

}
