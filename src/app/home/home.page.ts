import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../entities/user';
import { AuthenticationService } from '../services/authentication.service';
import { DBService } from '../services/db.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DBService, AuthenticationService]
})
export class HomePage {

  newUser: User;

  lista: User[];






  constructor(private dbService: DBService, private authService: AuthenticationService, private afService: AngularFireAuth, private toastController: ToastController, private router: Router) {
    this.newUser = new User();


    this.inicializarDadosLogin();
    this.inicializarUsuarios();
  }



  async inicializarDadosLogin() {
  }

  async inicializarUsuarios() {
    this.lista = await this.dbService.listWithUIDs<User>('usuarios');
  }
  logarUsuario() {
    this.router.navigate(['/tabs/logado']);
  }


  async addUser() {
    await this.authService.register(this.newUser.email, this.newUser.senha)
      .then(() => {
        this.logarUsuario();
      })
      .catch(error => {
        console.log(error);
        alert('Este e-mail já está em uso. Tente outro.');
      });


    await this.dbService.insertInList('usuarios', this.newUser);
    alert('Usuário foi cadastrado com sucesso.');

  }

  async remove(key: string) {
    await this.dbService.remove('usuarios', key);

    alert('Usuário removido com sucesso!');

    this.inicializarUsuarios();
  }

  edit(usuario) {
    usuario.isEditing = true;
  }

  cancelEdit(usuario) {
    usuario.isEditing = false;
  }

  confirmEdit(usuario) {
    this.dbService.update('usuarios', usuario.uid, { email: usuario.email, name: usuario.name });
    usuario.isEditing = false;
  }
}









