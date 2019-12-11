import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController, ActionSheetController } from '@ionic/angular';
import { Receita } from '../entities/receitas';
import { DBService } from '../services/db.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-ver-receita',
  templateUrl: './ver-receita.page.html',
  styleUrls: ['./ver-receita.page.scss'],
  providers: [Camera, CameraService]
})
export class VerReceitaPage implements OnInit {

  verReceita: Receita;
  isEditingReceita: boolean;
  loading;

  constructor(private modalController: ModalController,
    private dbService: DBService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private cameraService: CameraService,
    private actionSheetController: ActionSheetController
  ) {
    this.initialize();
    this.isEditingReceita = false
  }

  async initialize() {
    await this.presentLoading();
    await this.hideLoading();
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

  ngOnInit() {
  }


  async presentToast(displayMessage: string) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }

  remove(key: string) {
    this.dbService.remove('receitas', key);
    this.dismiss()
  }

  edit() {
    this.isEditingReceita = true;
  }

  cancelEdit() {
    this.isEditingReceita = false;
  }

  confEditReceita() {
    this.dbService.update('receitas', this.verReceita.uid, {
      titulo: this.verReceita.titulo,
      ingredientes: this.verReceita.ingredientes,
      porcao: this.verReceita.porcao,
      tempodepreparo: this.verReceita.tempodepreparo,
      mododepreparo: this.verReceita.mododepreparo
    });
    this.isEditingReceita = false;
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
              this.verReceita.imagem = foto;
            }
            );
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.cameraService.pickFromGallery().then((foto) => {
              this.verReceita.imagem = foto;
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