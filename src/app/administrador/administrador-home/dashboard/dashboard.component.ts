import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { Component } from '@angular/core';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent { }

