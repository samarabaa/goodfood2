import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DBService } from './db.service';
import { User } from '../entities/user';
import { Receita } from '../entities/receitas';

@Injectable()
export class AuthenticationService {

    constructor(private afAuth: AngularFireAuth, private dbService: DBService) {

    }

    login(email: string, senha: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, senha);
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    
  register(email: string, senha: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, senha);
  }

    password(usuario: User) {
        return this.afAuth.auth.sendPasswordResetEmail(usuario.email);
    }
    async loggedInUser() {
        return new Promise<User>((resolve, reject) => {
          this.afAuth.user
            .subscribe(async user => {
              const userFromDB = (await this.dbService.search<User>('usuarios', 'email', user.email))[0];
    
              resolve(userFromDB);
            });
        });
      }



    getAuth() {
        return this.afAuth.auth;
    }

}