import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { DBService } from '../services/db.service';
import { User } from '../entities/user';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userOk: User;
  loading;

  constructor(private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private dbService: DBService,
    private authentication: AuthenticationService,
    private router: Router
  ) {
    this.getUser();

  }
  async getUser(){
    await this.presentLoading();
    this.userOk = await this.authentication.loggedInUser()
    await this.hideLoading();
  }
  ngOnInit() {
  }
  async editUser(user: User) {
    const modal = await this.modalController.create({
      component: EditarUsuarioPage,
      componentProps: {
        editarUsuario: user
      }
    });
    return await modal.present();
  }
  async initialize() {
  
  }

  async hideLoading() {
    this.loading.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await this.loading.present();

  }

  async presentToast(displayMessage: string) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }

  remove(key: string) {
    this.dbService.remove('usuarios', key);
    this.dismiss()
  }

  async sair(){
    await this.presentLoading();
    this.authentication.logout();
    this.router.navigate(['/login']);
    await this.hideLoading();
  }


  
}
