import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MineService } from './../../services/mine.service';
@Component({
  selector: 'app-unusual',
  templateUrl: './unusual.component.html',
  styleUrls: ['./unusual.component.scss'],
  providers: [MineService]
})
export class UnusualComponent implements OnInit {

  list = [];
  currentDate = "";
  constructor(public nav: NavController, public servie: MineService) {


  }

  ngOnInit() {

    let now = new Date();
    this.currentDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    this.servie.getUnusualData({ "StationCode": "", "QueryDateTime": this.currentDate }).subscribe(res => {
      if (res.isSuccess) {
        res.data.forEach(element => {
          if (element.t3 < 0 || element.t6 < 0 || element.t9 < 0 || element.t12 < 0 || element.t20 < 0) {
            if (element.t3 < 0) {
              this.list.push({ "name": element.station_name, "layer": "3" })
            }
            if (element.t6 < 0) {
              this.list.push({ "name": element.station_name, "layer": "6" })
            }
            if (element.t9 < 0) {
              this.list.push({ "name": element.station_name, "layer": "9" })
            }
            if (element.t12 < 0) {
              this.list.push({ "name": element.station_name, "layer": "12" })
            }
            if (element.t20 < 0) {
              this.list.push({ "name": element.station_name, "layer": "20" })
            }
          }
        });
      }
      
    })
  }
  viewList() {

  }
}
