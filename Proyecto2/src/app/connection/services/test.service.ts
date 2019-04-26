import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../data/user';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({ providedIn: 'root' })
export class TestService {

  private url = 'localhost:3000/';  // URL to web api

  constructor(private http: HttpClient) { }

  getUsers() { return this.http.get(this.url + 'usuarios'); }

  // POST user by usr and pass
  tryLogIn (email: string, password: string): Observable<any> {
    let params = "json=" + JSON.stringify({correo: email, clave: password});
    return this.http.post<any>(this.url + 'login', params).pipe(catchError(
      this.handleError<any>('tryLogIn', [])) 
    );
  }

  // Handle Http operation that failed.
  // Let the app continue.
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Log a HeroService message with the MessageService
  private log(message: string) { console.log(message); }

}
