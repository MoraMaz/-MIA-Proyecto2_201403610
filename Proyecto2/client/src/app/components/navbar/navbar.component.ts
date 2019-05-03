import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  
  private sesionActiva: boolean = false;
  private home_selected: boolean = true;
  private products_selected: boolean = false;
  private cuenta_selected: boolean = false;

  ngOnInit() { this.comprobarSesion(); }

  goHome(): void {
    this.home_selected = true;
    this.products_selected = false;
    this.cuenta_selected = false;
  }

  goProducts(): void {
    this.home_selected = false;
    this.products_selected = true;
    this.cuenta_selected = false;
  }

  goAccount(): void {
    this.home_selected = false;
    this.products_selected = false;
    this.cuenta_selected = true;
  }

  cerrarSesion(): void {
    this.goHome();
    if(this.sesionActiva) this.auth.logOut().subscribe(() => { this.router.navigate(['/']);
      setTimeout(() => { location.reload(); }, 1000); });
  }

  comprobarSesion(): void { 
    this.sesionActiva = (this.auth.getToken() == null) ? false : true;
  }

}
