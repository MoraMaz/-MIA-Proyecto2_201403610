import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface';
import { userInfo } from 'os';
//import { CargaImagenService } from 'src/app/services/carga-imagen.service';

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

  constructor(private auth: AuthService, private router: Router,
    private fb : FormBuilder, private cd: ChangeDetectorRef
    //private enviandoImagen: CargaImagenService
    ) { }
  
  private hide = false;
  public respuestaImagenEnviada;
  public resultadoCarga;
  private password = new FormControl('', [Validators.required]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private name = new FormControl('', [Validators.required]);
  private lastname = new FormControl('', [Validators.required]);
  private phone = new FormControl('', [Validators.required]);
  private error: boolean = false;
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
    id: 0
  };
  genres: Genre[] = [
    {value: 'M', viewValue: 'Masculino'},
    {value: 'F', viewValue: 'Femenino'},
    {value: 'O', viewValue: 'Otros'}
  ];
  formGroup = this.fb.group({ file: [null, Validators.required] });

  ngOnInit() { if(this.auth.getToken() != null) this.router.navigate(["/home"]); }

  registrarUsuario(): void {
    if(!this.error){
      this.user.TIPO = 1;
      let dateFormat = require('dateformat');
      let fecha = new Date();
      dateFormat(fecha, "yyyy-mm-dd");
      this.auth.registerUser(this.user.CORREO, this.user.CLAVE).subscribe(user => {
        this.auth.registerUserDataBase(this.user.NOMBRE, this.user.APELLIDOS,
          this.user.CLAVE, this.user.CORREO, this.user.TELEFONO, this.user.FOTOGRAFIA,
          this.user.GENERO, this.componerFecha(this.user.NACIMIENTO), this.user.DIRECCION,
          this.user.TIPO, fecha.toString(), user.id).subscribe(db => {
            console.log(db);
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
    return (i > 8) ? (arr[3] + "-" + (i + 1) + "-" + arr[2]) 
      : (arr[3] + "-0" + (i + 1) + "-" + arr[2]);
  }

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
  
  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => { this.formGroup.patchValue({ file: reader.result });
        this.user.FOTOGRAFIA = reader.result.toString(); this.cd.markForCheck(); };
    }
  }

  /* onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({ file: reader.result });
        this.user.FOTOGRAFIA = reader.result.toString();
        const base64 = reader.result.toString().split(",", 2)[1];
        const date = new Date().valueOf();
        let text = '';
        const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
          text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
        }
        // Replace extension according to your media type
        const imageName = date + '.' + text + '.jpeg';
        // call method that creates a blob from dataUri
        const byteString = window.atob(base64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpeg' });    
        const imageBlob = blob;
        const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
        //this.user.fotografia = imageFile.name;
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }*/

}
