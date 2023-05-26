import { EditUserPage } from './../edit-user/edit-user.page';
import { AddUserPage } from './../add-user/add-user.page';
import { Name } from './../services/main/main.service';
import { MainService } from '../services/main/main.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  names: Name[] = [];
  constructor(private service: MainService, private modal: ModalController, public navCtrl: NavController, public alertController: AlertController) {}

  async ngOnInit(){
    await this.service.init();
    await this.readNames();
  }

  async readNames(){
    this.names = await this.service.readNames();
  }

  async removeUser(id: number){
    await this.service.removeUser(id);
    await this.readNames();
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: AddUserPage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then(() => {
      this.readNames();
      location.reload();
    })
    return await modal.present();
  }

  async presentEditModal(event){
    const id = this.names.findIndex(x => x.fname === event.target.id);
    
    const modal = await this.modal.create({
      component: EditUserPage,
      cssClass: 'my-custom-class',
      componentProps:{
        'id': id
      }
    });

    modal.onDidDismiss().then(() => {
      this.readNames();
      location.reload();
    })
    return await modal.present();
  }

  async presentAlertConfirm(event) {
    const id = this.names.findIndex(x => x.fname === event.target.id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to <strong>remove</strong> this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.removeUser(id);
          }
        }
      ]
    });

    await alert.present();
  }
  
}
