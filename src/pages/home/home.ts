import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AddmembarPage } from '../addmembar/addmembar';
import { MembarlistPage } from '../membarlist/membarlist';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    addMembar=AddmembarPage;
    membarList=MembarlistPage;

  constructor(public navCtrl: NavController) {

  }


openPage(page) {
    this.navCtrl.push(page);
}

}
