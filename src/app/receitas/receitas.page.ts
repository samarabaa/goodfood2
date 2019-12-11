import { Component, OnInit } from '@angular/core';
import { Receita} from '../entities/receitas';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { DBService } from '../services/db.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
  providers: [ DBService, AuthenticationService]
})
export class ReceitasPage  {

  newReceita: Receita;

  lista: Receita[];

  constructor(private dbService: DBService, private authService: AuthenticationService) {
    this.lista = [];
    this.newReceita = new Receita();

    
    this.inicializarReceitas();
  }

  



  async inicializarReceitas() {
    this.lista = await this.dbService.listWithUIDs<Receita>('receitas');
  }

  async adicionarReceita() {
    await this.dbService.insertInList('receitas', this.newReceita);

    this.inicializarReceitas();

    alert('Receita cadastrada com sucesso!');

    this.newReceita = new Receita();
  }

  async remove(key: string) {
    await this.dbService.remove('receitas', key);

    alert('Receita removida com sucesso!');

    this.inicializarReceitas();
  }

  edit(receita) {
    receita.isEditing = true;
  }

  cancelEdit(receita) {
    receita.isEditing = false;
  }

  confirmEdit(receita) {
    this.dbService.update('receitas', receita.uid, { titulo: receita.titulo, ingredientes: receita.ingredientes, mododepreparo: receita.mododepreparo, tempodepreparo: receita.tempodepreparo, porcao: receita.porcao } );
    receita.isEditing = false;
  }

  

}
