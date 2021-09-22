import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Club } from 'src/app/model/Club';
import { StatisticData } from 'src/app/model/StatisticData';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() club: Club;
  // club: Club;

  chart: any;
  statisticData: StatisticData;

  constructor(private authService: AuthService, private playerService: PlayerService) { }

  ngOnInit() {
    // this.club = this.authService.getClub();
    
    this.playerService.getBestGoalScorers(this.club.clubid).subscribe(
      (res)=>{
        this.statisticData = res;
        this.initChart(this.statisticData.names, this.statisticData.goals, this.statisticData.assists);
      }
    );
  }

  initChart(labels: string[], goals: number[], assists: number[]) {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: goals,
            backgroundColor: '#ff3333',
            fill: true,
            label: 'Golls',
          },
          {
            data: assists,
            backgroundColor: '#008ae6',
            fill: true,
            label: 'Assists',
          },
        ],
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: 'Player Statistcs',
        },
        legend: {
          display: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
  }

}
