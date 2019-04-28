import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CargaImagenService } from 'src/app/services/carga-imagen.service';

export interface Genre {
  value: string;
  viewValue: string;
}

export interface Month {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private enviandoImagen: CargaImagenService) { }
  
  public respuestaImagenEnviada;
  public resultadoCarga;
  private password = new FormControl('', [Validators.required]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private name = new FormControl('', [Validators.required]);
  private lastname = new FormControl('', [Validators.required]);
  private phone = new FormControl('', [Validators.required]);
  private error: boolean = false;
  genreLabel = "Género";
  private user: UserInterface = {
    nombre: "",
    apellidos: "",
    clave: "",
    correo: "",
    telefono: "",
    fotografia: "",
    genero: "",
    nacimiento: "",
    direccion: "",
    tipo: 0
  };
  genres: Genre[] = [
    {value: 'M', viewValue: 'Masculino'},
    {value: 'F', viewValue: 'Femenino'},
    {value: 'O', viewValue: 'Otros'}
  ];

  getErrorNameMessage() {
    return this.name.hasError('required') ? 'Por favor, ingrese su nombre.' : '';
  }

  getErrorLastNameMessage() {
    return this.lastname.hasError('required') ? 'Por favor, ingrese sus apellidos.' : '';
  }

  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Por favor, ingrese su correo electrónico.' :
      this.email.hasError('email') ? 'El correo es inválido.' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Por favor, ingrese su contraseña.' :
      this.password.hasError('pattern') ? 'La contraseña no es válida.' : '';
  }

  getErrorPhoneMessage() {
    return this.phone.hasError('required') ? 'Por favor, ingrese su teléfono.' :
    this.phone.hasError('pattern') ? 'El teléfono no es válido.' : '';
  }

  registrarUsuario(): void {
    if(!this.error){
      this.user.tipo = 1;
      let dateFormat = require('dateformat');
      let fecha = new Date();
      dateFormat(fecha, "yyyy-mm-dd");
      this.auth.registerUserDataBase(this.user.nombre, this.user.apellidos, this.user.clave,
        this.user.correo, this.user.telefono, this.user.fotografia, this.user.genero,
        this.componerFecha(this.user.nacimiento), this.user.direccion, this.user.tipo,
        fecha.toString()).subscribe(userdb => {
          this.auth.registerUser(this.user.correo, this.user.clave)
          .subscribe(user => {
            //this.auth.setUser(user);
            //this.auth.setToken(user.id);
            this.router.navigate(['/']);
          });
        });
    }
  }

  componerFecha(date: string): string{
    let fecha = date + '';
    let arr = fecha.split(" ", 4);
    let ano: Month[] = [
      {name: "Jan"}, {name: "Feb"}, {name: "Mar"}, {name: "Apr"},
      {name: "May"}, {name: "Jun"}, {name: "Jul"}, {name: "Aug"},
      {name: "Sep"}, {name: "Oct"}, {name: "Nov"}, {name: "Dec"}
    ];
    let i = 0;
    for(i = 0; i < 12; i++) if(arr[1] == ano[i].name) break;
    return (i > 8) ? (arr[2] + "-" + (i + 1) + "-" + arr[3]) 
      : (arr[2] + "-0" + (i + 1) + "-" + arr[3]);
  }

  ngOnInit() {
    if(this.auth.getToken() != null) this.router.navigate(["/login"]);
  }
  
  public cargandoImagen(files: FileList){
    this.enviandoImagen.postFileImagen(files[0]).subscribe(response => {
      this.respuestaImagenEnviada = response;
      if(this.respuestaImagenEnviada <= 1)console.log("Error en el servidor"); 
      else
        if(this.respuestaImagenEnviada.code == 200 
          && this.respuestaImagenEnviada.status == "success") this.resultadoCarga = 1;
        else this.resultadoCarga = 2;
    }, error => { console.log(<any>error); });
  }

}
