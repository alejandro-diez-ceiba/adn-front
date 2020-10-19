import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { KardexService } from '@app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Kardex } from '@app/shared';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  pieChartLabels: Label[] = ['Entradas', 'Salidas'];
  pieChartData: number[];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieReady = false;
  pieProfits = 0;
  pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)']
    }
  ];

  constructor(
    private readonly kardexSv: KardexService,
    private readonly spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    forkJoin([
      this.kardexSv.getByEntryOrExit(true),
      this.kardexSv.getByEntryOrExit(false)
    ]).pipe(
      tap(([entrys, exits]: [Kardex[], Kardex[]]) => {
        const entrysValue = entrys.reduce((prev, next) => {
          return prev += next.price;
        }, 0);
        const exitsValue = exits.reduce((prev, next) => {
          return prev += next.price;
        }, 0);

        this.pieProfits = (exitsValue - entrysValue);
        this.pieChartData = [entrys.length, exits.length];
        this.spinner.hide();
        this.pieReady = true;
      })
    ).subscribe();
  }

}
