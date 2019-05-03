import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService) { }
  
  user: UserInterface;

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    switch(this.user.GENERO){
      case 'M': this.user.GENERO = 'Masculino'; break;
      case 'F': this.user.GENERO = 'Femenino'; break;
      default: this.user.GENERO = 'Otro'; break;
    }
  }
}
