import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public nav: NavController) { }
  // goto(item) {
  //   // this.nav.navigateRoot(item);

  //   // switch item:
  //   //   case "main":
  //   switch (item) {
  //     case "main":
  //       this.nav.navigateRoot("/home/main");
  //       break;
  //     case "monitor":
  //       this.nav.navigateRoot("/home/monitor");
  //       break;
  //     case "weather":
  //       this.nav.navigateRoot("/home/weather");
  //       break;
  //     case "mine":
  //       this.nav.navigateRoot("/home/mine");
  //       break;
  //   }
  // }
}
