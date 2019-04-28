import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CargaImagenService{

	constructor(private http: HttpClient){}

	public url_servidor = "http://servicioremoto.com/cargando-imagen.php";

	public postFileImagen(imagenParaSubir: File){
		const formData = new FormData();
		formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name);
		return this.http.post(this.url_servidor, formData);
	}

}
