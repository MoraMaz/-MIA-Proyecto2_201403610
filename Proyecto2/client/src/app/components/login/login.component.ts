import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router,
    private location: Location) { }
  
  private password = new FormControl('', [Validators.required]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private error: boolean = false;
  private verificado: boolean = false;
  private user: UserInterface = {
    NOMBRE: "",
    APELLIDOS: "",
    CLAVE: "",
    CORREO: "",
    TELEFONO: "",
    FOTOGRAFIA: "",
    GENERO: "",
    NACIMIENTO: "",
    DIRECCION: "",
    TIPO: 0,
    ID: 0
  };

  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Por favor, ingrese su correo electrónico.' :
      this.email.hasError('email') ? 'El correo es inválido.' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Por favor, ingrese su contraseña.' :
      this.password.hasError('pattern') ? 'La contraseña no es válida.' : '';
  }

  iniciarSesion(form: NgForm) {
    if(form.valid) 
      if(this.auth.getToken() == null){
        return this.auth.tryLogin(this.user.CORREO, this.user.CLAVE)
          .subscribe(data => { this.auth.getUserById(data.user.id).subscribe(user => {
            user.CLAVE = ''; this.user = user; this.auth.setToken(data.id);
            this.auth.setUser(this.user); this.router.navigate(['/home']); 
            setTimeout(() => { location.reload(); }, 1000); }, () => {
              this.mostrarError(); }); }, () => { this.mostrarError(); }); }
      else this.auth.logOut().subscribe(() => { location.reload(); });
    else this.mostrarError();
  }

  mostrarError(){ this.error = true; setTimeout(() => {this.error = false;}, 4000); }

  ngOnInit() { if(this.auth.getToken()) this.router.navigate(["/home"]); }

}
