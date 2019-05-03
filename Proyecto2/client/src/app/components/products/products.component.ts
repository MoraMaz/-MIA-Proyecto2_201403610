import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ProductInterface } from 'src/app/models/product-interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  
  constructor(private dataApi: DataApiService) {}
  
  private products: ProductInterface;
  private crearProductos: boolean = false;
  private misProductos: boolean = false;

  ngOnInit() {
    this.getListProduct();
  }

  getListProduct() {
    this.dataApi.getAllProducts().subscribe(
      (products: ProductInterface) => {this.products = products; console.log(products);}
    );
  }

  verTodos() {
    this.crearProductos = false;
    this.misProductos = false;
  }

  verMisProductos() {
    this.crearProductos = false;
    this.misProductos = true;
  }

  crearProducto() {
    this.crearProductos = true;
    this.misProductos = false;
  }

}
