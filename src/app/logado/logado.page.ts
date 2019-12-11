import { Component, OnInit } from '@angular/core';
import { Receita } from '../entities/receitas';
import { DBService } from '../services/db.service';
import { Router } from '@angular/router';
import { VerReceitaPage } from '../ver-receita/ver-receita.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-logado',
  templateUrl: './logado.page.html',
  styleUrls: ['./logado.page.scss'],
})
export class LogadoPage implements OnInit {

  receitasLista: Receita[];
  loading: any;

  constructor(private dbService: DBService, private router: Router, private modal: ModalController) { 
    this.listarReceitas();
  }

  ngOnInit() {
  }
  
  verMais(){
    this.router.navigate(['ver-receita']);
  }
  async listarReceitas() {
    this.receitasLista = await this.dbService.listWithUIDs<Receita>('receitas');

  }

  async verReceita(receita: Receita) {
    const modal = await this.modal.create({
      component: VerReceitaPage,
      componentProps: {
        verReceita: receita
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.listarReceitas()
    })

    return await modal.present();
  }
}
