import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { TestService } from '../../connection/services/test.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  /*$http.post('192.168.0.11:3000/login', ).then(
        function successCallback(response) { }, 
        function errorCallback(response) { }
    );*/
  constructor (private testService: TestService) {}

  emai = 'asdasd';
  pass = 'dsadsa';
  login = '0';
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() { this.getAllUsers(); }

  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Por favor, ingrese su correo electrónico.' :
      this.email.hasError('email') ? 'El correo es inválido.' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Por favor, ingrese su contraseña.' :
      this.password.hasError('pattern') ? 'La contraseña no es válida.' : '';
  }

  getAllUsers(){ this.testService.getUsers().subscribe(users => console.log(users)); }

  verificarDatos(){
    
  }


  //http://192.168.0.11:3000/conexion?opc=0&correo={{emai}}&clave={{pass}}

  matcher = new MyErrorStateMatcher();

}
