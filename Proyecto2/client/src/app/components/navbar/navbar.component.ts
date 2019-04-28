import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }
  
  private sesionActiva: boolean = false;

  ngOnInit() { this.comprobarSesion(); }

  cerrarSesion(): void {
    if(this.sesionActiva) this.auth.logOut().subscribe(() => { this.comprobarSesion(); });
    location.reload();
  }

  comprobarSesion(): void { 
    this.sesionActiva = (this.auth.getToken() == null) ? false : true;
  }

}
