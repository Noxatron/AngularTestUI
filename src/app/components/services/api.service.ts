import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Application } from '../../interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl:string="https://localhost:7285/Application"
  constructor(private http:HttpClient, private auth:AuthService) { }

  getApplications(){
    // Retrieve the id_token from session storage
    const idToken = this.auth.getToken()

    // Check if the token exists
    if (!idToken) {
      throw new Error('No id_token found in session storage');
    }
    
    // Set the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${idToken}`
    });
    
    return this.http.get<any>(this.baseUrl, { headers: headers });
  }
  createApplication(application:Application){
    // Retrieve the id_token from session storage
    const idToken = this.auth.getToken();

    // Check if the token exists
    if (!idToken) {
      throw new Error('No id_token found in session storage');
    }

    // Set the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${idToken}`
    });

    // Create the request body
    const body = { type:application.type, message:application.message };

    // Send a POST request to create a new application
    return this.http.post<any>(`${this.baseUrl}`, body, { headers: headers });
  }
}
