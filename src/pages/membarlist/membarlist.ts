import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

//@IonicPage()
@Component({
  selector: 'page-membarlist',
  templateUrl: 'membarlist.html',
})
export class MembarlistPage {
expenses: any = [];
totalIncome = 0;
totalExpense = 0;
balance = 0;
  constructor(private toast: Toast,private sqlite: SQLite,public navCtrl: NavController, public navParams: NavParams) {
  }
ionViewDidLoad() {
  this.getData();
}

ionViewWillEnter() {
  this.getData();
}

getData() {
  this.sqlite.create({
    name: 'mesv1.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS addmembar(id INTEGER PRIMARY KEY,date DATE,time TEXT,type TEXT,fullName TEXT,mobileNo TEXT,alternativeNO TEXT,address TEXT,email TEXT,birthDate DATE,adharNo TEXT,joinDate DATE,note TEXT,adharImgFirst TEXT,adharImgSecound TEXT,profileImg TEXT)', {})
    .then(res => console.log('Executed SQL'))
    .catch(e => console.log(e));
    db.executeSql('SELECT * FROM addmembar ORDER BY id DESC', {})
    .then(res => {
      this.expenses = [];
      for(var i=0; i<res.rows.length; i++) {
        this.expenses.push({id:res.rows.item(i).id,fullName:res.rows.item(i).fullName,mobileNo:res.rows.item(i).mobileNo,joinDate:res.rows.item(i).joinDate,profileImage:res.rows.item(i).profileImg})
      }
    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));    
}

deleteData(rowid) {
  this.sqlite.create({
    name: 'mesv1.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('DELETE FROM addmembar WHERE id=?', [rowid])
    .then(res => {
     // console.log(res);
        this.toast.show('Data Deleted.', '5000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
      this.getData();
    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));
}

 

}
