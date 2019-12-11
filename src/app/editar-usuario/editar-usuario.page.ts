import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { ModalController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
  providers: [Camera, CameraService]
})
export class EditarUsuarioPage implements OnInit {

  editarUsuario: User;
  loading;

  constructor(
    private modalController: ModalController,
    private dbService: DBService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private cameraService: CameraService,
    private actionSheetController: ActionSheetController
  ) {
    this.initialize();
  }

  ngOnInit() {
  }

  async initialize() {
    await this.presentLoading();
    await this.hideLoading();
  }

  async hideLoading() {
    this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await this.loading.present();

  }

  dismiss() {
    this.modalController.dismiss();
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

  async save() {
    await this.presentLoading();

    await this.dbService.update('usuarios', this.editarUsuario.uid, { imagem: this.editarUsuario.imagem || null, name: this.editarUsuario.name });

    await this.hideLoading();

    this.presentToast('Dados atualizados');

    this.dismiss();
  }

  async changePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.cameraService.takePicture().then((foto) => {
              this.editarUsuario.imagem = foto;
            }
            );
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.cameraService.pickFromGallery().then((foto) => {
              this.editarUsuario.imagem = foto;
            }
            );
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();

  }
}
