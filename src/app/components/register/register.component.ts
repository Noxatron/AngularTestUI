import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  type:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  hideShowPass(){
    this.isText=!this.isText
    this.eyeIcon=this.isText?"fa-eye":"fa-eye-slash"
    this.type=this.isText?"text":"password"
  }
}
