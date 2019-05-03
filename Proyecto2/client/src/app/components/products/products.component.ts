import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ProductInterface } from 'src/app/models/product-interface';
import { AuthService } from 'src/app/services/auth.service';
import { getListeners } from '@angular/core/src/render3/discovery_utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  
  constructor(private auth: AuthService, private dataApi: DataApiService) {}
  
  private products: ProductInterface;
  private crearProductos: boolean = false;
  private misProductos: boolean = false;

  ngOnInit() {
    this.getListProduct();
  }

  getListProduct() {
    this.dataApi.getAllProducts().subscribe(
      (products: ProductInterface) => { this.products = products; }
    );
  }

  getMyProducts(){
    let user = this.auth.getCurrentUser();
    this.dataApi.getMyProducts(user.ID_USUARIO).subscribe(
      (products: ProductInterface) => { this.products = products; }
    );
  }

  verTodos() {
    this.crearProductos = false;
    this.misProductos = false;
    this.getListProduct();
  }

  verMisProductos() {
    this.crearProductos = false;
    this.misProductos = true;
    this.getMyProducts();
  }

  crearProducto() {
    this.crearProductos = true;
    this.misProductos = false;
  }

  onFileChange(event) { }

}
