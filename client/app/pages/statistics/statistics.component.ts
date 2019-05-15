
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit  {
  isLoading = true;
  view: any[] = [1200, 250];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'bla';
  showYAxisLabel = true;
  yAxisLabel = 'bal2';
  timeline = true;

  colorScheme = {
    domain: []
  };

  public singlePie = [];
  public singleBar = [];
  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    public dialog: MatDialog,
    public router: Router,
  ) { }
  ngOnInit() {
  }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
}