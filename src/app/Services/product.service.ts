import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable()
export class ProductService implements OnInit {
  currentUser: User | undefined;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.loadAuthUser();
  }
  private baseUrl: string = environment.BASEURL;

  getProducts() {
    let headers = new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Bearer " + this.currentUser?.token });
    return this.http.get<Product[]>(`${this.baseUrl}/getall`, { headers: headers });
  }

  addProduct(productInsert: Product) {
    debugger
    return this.http.post<boolean>(`${this.baseUrl}/add`, productInsert);
  }

  deleteProduct(pid: number) {
    return this.http.delete<boolean>(`${this.baseUrl}/delete/${pid}`);
  }

  getProductById(pid: number) {
    return this.http.get<Product>(`${this.baseUrl}/get/${pid}`);
  }

}
