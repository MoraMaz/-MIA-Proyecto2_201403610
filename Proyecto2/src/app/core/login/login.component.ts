import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';


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
export class LoginComponent {
  /*$http.post('192.168.0.11:3000/login', ).then(
        function successCallback(response) { }, 
        function errorCallback(response) { }
    );*/

  emai = 'asdasd';
  pass = 'dsadsa';
  login = 'asdas';
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Por favor, ingrese su correo electrónico.' :
      this.email.hasError('email') ? 'El correo es inválido.' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Por favor, ingrese su contraseña.' :
      this.password.hasError('pattern') ? 'La contraseña no es válida.' : '';
  }

  verificarDatos(){
    var url = "http://192.168.0.11:3000/conexion?opc=0&correo=" + this.emai
      + "&clave=" + this.pass;
  }

  //http://192.168.0.11:3000/conexion?opc=0&correo={{emai}}&clave={{pass}}

  matcher = new MyErrorStateMatcher();

}
