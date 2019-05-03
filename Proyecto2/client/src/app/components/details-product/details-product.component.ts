import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/models/product-interface';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})

export class DetailsProductComponent implements OnInit {
  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  private product: ProductInterface = {
    ID_PRODUCTO: '',
    IMAGEN: '',
    DESCRIPCION: '',
    CATEGORIA: 0,
    PRECIO: 0,
    PUBLICACION: '',
    DISPONIBLES: 0,
    DUENO: 0,
    ID: 0
  };

  ngOnInit() {
    const book_id = this.route.snapshot.params['id'];
    this.getDetails(book_id);
  }

  getDetails(id: string) {
    this.dataApi.getProductById(id).subscribe(product => (this.product = product));
  }
}
