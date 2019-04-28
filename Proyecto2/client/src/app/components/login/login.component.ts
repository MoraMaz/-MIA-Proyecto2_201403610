import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  
  private password = new FormControl('', [Validators.required]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private error: boolean = false;
  private user: UserInterface = {
    correo: "",
    clave: ""
  }

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
        return this.auth.tryLogin(this.user.correo, this.user.clave)
        .subscribe(data => { this.auth.setUser(data.user); this.auth.setToken(data.id); 
        this.router.navigate(["/home"]); setTimeout(() => { location.reload();}, 1000) },
        () => { this.mostrarError(); });
      } else this.auth.logOut().subscribe(() => { 
        location.reload();
      });
    else this.mostrarError();
  }

  mostrarError(){
    this.error = true; setTimeout(() => {this.error = false;}, 4000);
  }

  ngOnInit() {
    if(this.auth.getToken() != null) this.router.navigate(["/home"]);
  }

}
