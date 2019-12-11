import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {

  users: User[];

  constructor(private dbService: DBService) {
    this.inicializarDados();
  }

  async inicializarDados() {
    this.users = await this.dbService.listWithUIDs<User>('usuarios');
  }

  ngOnInit() {
  }

}
