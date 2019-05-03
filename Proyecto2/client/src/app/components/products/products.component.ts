import { AuthService } from 'src/app/services/auth.service';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductInterface } from 'src/app/models/product-interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  
  constructor(private auth: AuthService, private dataApi: DataApiService,
    private fb : FormBuilder, private cd: ChangeDetectorRef) {}
  
  private products: ProductInterface;
  private crearProductos: boolean = false;
  private misProductos: boolean = false;
  private formGroup = this.fb.group({ file: [null, Validators.required] });

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

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({ file: reader.result });
        const base64 = reader.result.toString().split(",", 2)[1];
        const date = new Date().valueOf();
        let text = '';
        const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
          text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
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
  }

}
