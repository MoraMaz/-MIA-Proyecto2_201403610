import { Component, OnInit } from "@angular/core";
import { DataApiService } from "src/app/services/data-api.service";
import { ProductInterface } from "../../models/product-interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  
  constructor(private dataApi: DataApiService) {}
  
  private products: ProductInterface;

  ngOnInit() {
    this.getListProduct();
  }

  getListProduct() {
    this.dataApi.getAllProducts().subscribe(
      (products: ProductInterface) => (this.products = products)
    );
  }

}
