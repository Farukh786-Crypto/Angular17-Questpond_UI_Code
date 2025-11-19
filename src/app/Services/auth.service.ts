import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | undefined;
  private isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) { }

  login() {
    this.isLoggedIn = !this.isLoggedIn;
    sessionStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
  }

  authenticated(): boolean {
    if (sessionStorage.getItem('isLoggedIn')) {
      return true;
    }
    return false;
  }

  Logout() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
  }

  // https://localhost:44379/api/Auth/authenticate
  ValidateUser(loginUser: Login) {

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    let data = JSON.stringify(loginUser);
    // return this.httpClient.post('https://localhost:44379/api/Auth/authenticate', data, { headers: headers });
    return this.httpClient.post('https://localhost:44379/api/Auth/authenticate', data);
  }

  setAuthUser(user: User) {
    localStorage["auth"] = JSON.stringify(user);
  }

  loadAuthUser() {
    debugger
    if (localStorage["auth"] != null) {
      this.currentUser = JSON.parse(localStorage["auth"]);
      return this.currentUser;
    }
    else {
      // it means object is empty or null
      this.currentUser = undefined;
      return this.currentUser;
    }
  }

  removeAuthUser() {
    this.currentUser = undefined;
    localStorage.removeItem('auth');
  }

}
