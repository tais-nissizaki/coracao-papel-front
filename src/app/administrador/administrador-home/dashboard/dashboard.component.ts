import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { SeriesOptionsType } from 'highcharts';
import { map } from 'rxjs/operators';
import { DashboardService } from '../../../services/dashboard.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  formDashboard!: FormGroup;
  options?: Highcharts.Options;
  constructor(
    formBuilder: FormBuilder,
    private dashboardService: DashboardService,
  ) {
    this.formDashboard = formBuilder.group({
      'tipoGrafico': [null, Validators.required],
      'dataInicial': [null, Validators.required],
      'dataFinal': [null, Validators.required],
    });
  }

  gerarGrafico() {
    if(this.formDashboard.valid) {
      const tipoGrafico = this.formDashboard.value.tipoGrafico;
      const dataInicial = this.formDashboard.value.dataInicial;
      const dataFinal = this.formDashboard.value.dataFinal;
      const title = tipoGrafico ?
                    tipoGrafico  == 'GRAFICO_POR_PRODUTO' ?
                      'Vendas por produto' : 'Vendas por categoria'
                    : null;
      this.options = {
        chart: {
          type: 'line',
        },
        title: {
          text: title
        },
        tooltip: {
          formatter: function() {
            return '<b>x: </b>' + Highcharts.dateFormat('%e %b %y', this.x) +
              ' <br> <b>y: </b>' + this.y;
          }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        yAxis: {
          title: {
            text: 'Quantidade vendida'
          }
        },
        xAxis: {
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000,
          labels: {
            formatter: function() {
              return Highcharts.dateFormat('%e %b %y', this.value);
            }
          }
        },
        series: [
        ],
      }
      this.updateGraph(tipoGrafico, dataInicial, dataFinal);
    } else {
      alert('Erro no preenchimento dos campos.')
    }
  }

  updateGraph(tipoGrafico: String, dataInicial: Date, dataFinal: Date) {
    if (tipoGrafico  == 'GRAFICO_POR_PRODUTO') {
      this.dashboardService.analiticoPorProduto (dataInicial, dataFinal)
      .pipe(
        map((itens): SeriesOptionsType[] => {
          return itens.map(item => ({
              type:'line',
              name: (item.item as any).titulo || (item.item as any).descricao || item.item,
              data: item.itensPorData.map(itemPorData => {
                return [new Date(itemPorData.data).getTime(), itemPorData.quantidade]
              })
            })
          )
        })
      )
      .subscribe(itens => {
        this.options.series = itens;
        Highcharts.chart('dashboard', this.options);
      })
    } else {
      this.dashboardService.analiticoPorCategoria(dataInicial, dataFinal)
      .pipe(
        map((itens): SeriesOptionsType[] => {
          return itens.map(item => ({
              type:'line',
              name: (item.item as any).titulo || (item.item as any).descricao || item.item,
              data: item.itensPorData.map(itemPorData => {
                return [new Date(itemPorData.data).getTime(), itemPorData.quantidade]
              })
            })
          )
        })
      )
      .subscribe(itens => {
        this.options.series = itens;
        Highcharts.chart('dashboard', this.options);
      })
    }
  }
}

