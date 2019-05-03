import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UserInterface } from '../models/user-interface';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private http: HttpClient) { }

  urlUser = "http://localhost:3000/api/Users";
  urlUserdb = "http://localhost:3000/api/A_USUARIOs";
  headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});

  registerUser(correo: string, clave: string){
    return this.http.post<UserInterface>(this.urlUser, { email: correo, password: clave }, 
      { headers: this.headers }).pipe(map(data => data));
  }

  registerUserDataBase(nombre: string, apellidos: string, clave: string, correo: string,
    telefono: string, fotografia: string, genero: string, nacimiento: string,
    direccion: string, tipo: number, registro: string, id: number){
      let estado = 0;
      console.log(id);
      if(tipo == 1){ //SI ES CLIENTE, SE GENERA ALEATORIAMENTE LA CLASE
        let clase = Math.round(Math.random() * 4) + 1;
        let credito = 0;
        switch(clase){
          case 1: credito = 50000; break;
          case 2: credito = 25000; break;
          case 3: credito = 10000; break;
          case 4: credito = 5000; break;
          default: clase = 5; credito = 1000; break;
        }
        return this.http.post<UserInterface>(this.urlUserdb, {ID_USUARIO: 0,
          NOMBRE: nombre, APELLIDOS: apellidos, CLAVE: clave, CORREO: correo,
          TELEFONO: telefono, FOTOGRAFIA: fotografia, GENERO: genero, NACIMIENTO: nacimiento,
          REGISTRO: registro, DIRECCION: direccion, CREDITO: credito, GANANCIA: 0,
          CLASE: clase, ESTADO: estado, TIPO: tipo, id: id}, {headers: this.headers}).pipe(
            map(data => data));
      } else { //SI ES HELP DESK O ADMINISTRADOR, NO SE NECESITA CLASE NI GANANCIA
        return this.http.post<UserInterface>(this.urlUserdb, {ID_USUARIO: 0,
          NOMBRE: nombre, APELLIDOS: apellidos, CLAVE: clave, CORREO: correo,
          TELEFONO: telefono, FOTOGRAFIA: fotografia, GENERO: genero, NACIMIENTO: nacimiento,
          REGISTRO: registro, DIRECCION: direccion, CREDITO: 0, GANANCIA: 0, CLASE: 1,
          ESTADO: estado, TIPO: tipo, id: id}, {headers: this.headers}).pipe(
            map(data => data));
      }
  }

  getUserById(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.urlUserdb + `/${id}`);
  }

  tryLogin(email: string, password: string): Observable<any>{
    return this.http.post(this.urlUser + "/login?include=user", {email, password},
      {headers: this.headers}).pipe(map(data => data)
    );
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("cuser", user_string);
  }

  getCurrentUser(): UserInterface { 
    let user_string = localStorage.getItem("cuser");
    let user: UserInterface;
    try { user = JSON.parse(user_string); } catch (error) { } 
    return (isNullOrUndefined(user_string)) ? null : user;
  }

  logOut() {
    let acces_token = localStorage.getItem("accessutk");
    const url = this.urlUser + `/logout?access_token=${acces_token}`;
    localStorage.removeItem("cuser");
    localStorage.removeItem("accessutk");
    return this.http.post<UserInterface>(url, {headers: this.headers} );
  }

  setToken(token): void { localStorage.setItem("accessutk", token); }

  getToken(){ //return localStorage.getItem("accessutk");
    return (isNullOrUndefined(localStorage.getItem("accessutk"))) ? null :
      localStorage.getItem("accessutk");
  }

}
