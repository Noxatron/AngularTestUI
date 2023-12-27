import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7285/"
  constructor(private http:HttpClient) { }

  register(user:any){
    return this.http.post<any>(`${this.baseUrl}register`,user)
  }
  login(user:any){
    return this.http.post<any>(`${this.baseUrl}login`,user)
  }
  logout() {
    localStorage.removeItem('id_token');
  }

  public setSession(authResult:any) {
    localStorage.setItem('id_token', authResult.token); // Assuming the token is in authResult.token
  }

  public isLoggedIn() {
    return !!localStorage.getItem('id_token');
  }

  public getToken() {
    return localStorage.getItem('id_token');
  }
}
