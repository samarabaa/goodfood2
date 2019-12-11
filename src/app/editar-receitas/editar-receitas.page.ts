import { Component, OnInit } from '@angular/core';
import { Receita } from '../entities/receitas';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-editar-receitas',
  templateUrl: './editar-receitas.page.html',
  styleUrls: ['./editar-receitas.page.scss'],
})
export class EditarReceitasPage implements OnInit {

  editarReceita: Receita;
  receitas: Receita[];
  loading;

  constructor(private modalController: ModalController, private dbService: DBService, private loadingController: LoadingController,  private toastController: ToastController) { 
    this.initialize();
  }

  ngOnInit() {
  }

  async initialize() {
    await this.presentLoading();

    this.receitas = await this.dbService.listWithUIDs<Receita>('receitas');

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
  
  async save() {
    await this.presentLoading();

    await this.dbService.update('receitas', this.editarReceita.uid, {imagem: this.editarReceita.imagem , titulo: this.editarReceita.titulo, ingredientes: this.editarReceita.ingredientes, porcao: this.editarReceita.porcao,tempodepreparo: this.editarReceita.tempodepreparo, mododepreparo: this.editarReceita.mododepreparo });

    await this.hideLoading();

    this.presentToast('Dados atualizados');

    this.dismiss();
  }

  async presentToast(displayMessage: string) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }

}
