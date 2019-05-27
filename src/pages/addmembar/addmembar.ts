import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import {  Validators,ValidatorFn,AbstractControl,FormBuilder } from '@angular/forms';
//@IonicPage()
@Component({
  selector: 'page-addmembar',
  templateUrl: 'addmembar.html',
})
export class AddmembarPage {
private addmembar:any;
  data = {type:"",fullName:"",mobileNo:"",alertNo:"",address:"",email:"",birtdate:"",adharNo:"",joinDate:"",note:"",adharImgFirst:"",adharImgSecound:"",profileImg:""};
  constructor(private _form:FormBuilder,private sqlite: SQLite,
    private toast: Toast,public navCtrl: NavController, public navParams: NavParams) {
this.addmembar=this._form.group({  
'data.type': [null,  Validators.required],
'data.fullName': [null,  Validators.required],
'data.mobileNo': [null, Validators.compose([Validators.maxLength(10), Validators.required])],
'data.address': [null,  Validators.required],
'data.alertNo': [null, Validators.compose([Validators.maxLength(10)])],
'data.email' : [null, Validators.compose([Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
'data.birtdate': [null,  Validators.required],
'data.adharNo': [null],
'data.joinDate': [null,  Validators.required],
'data.note' : [null],
});

  }

saveData() {
    this.sqlite.create({
      name: 'mesv1.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO addmembar VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[this.data.joinDate,this.data.joinDate,this.data.type,this.data.fullName,this.data.mobileNo,this.data.alertNo,this.data.address,this.data.email,this.data.birtdate,this.data.adharNo,this.data.joinDate,this.data.note,this.data.adharImgFirst,this.data.adharImgSecound,this.data.profileImg])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '3000', 'bottom').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }    



  

}
