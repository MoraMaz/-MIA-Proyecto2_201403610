import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProductInterface } from '../models/product-interface';

@Injectable({ providedIn: 'root' })

export class DataApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url = "http://localhost:3000/api/A_PRODUCTOs";
  users: Observable<any>;
  user: Observable<any>;
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "applicaction/json",
    Authorization: this.authService.getToken()
  });

  getAllProducts() { return this.http.get(this.url); }

  getUserById(id: string) { return (this.user = this.http.get(this.url + `/${id}`)); }

  getIwachu() { return (this.user = this.http.get(this.url + "?filter[where][estado]=1")); }

  saveProduct(product: ProductInterface) {
    let token = this.authService.getToken();
    return this.http.post<ProductInterface>(this.url + `?acces_token=${token}`, product,
      {headers: this.headers} ).pipe(map(data => data));
  }

  updateProduct(product: ProductInterface) {
    let token = this.authService.getToken();
    return this.http.put<ProductInterface>(this.url + `?acces_token=${token}`, product,
      {headers: this.headers}).pipe(map(data => data));
  }

  deleteProduct(id: string) {
    let token = this.authService.getToken();
    return this.http.delete<ProductInterface>(this.url + `?acces_token=${token}`,
      {headers: this.headers}).pipe(map(data => data));
  }
  
}
