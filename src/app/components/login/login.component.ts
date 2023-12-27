import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
interface User{
  username:string,
  password:string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  type:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  loginForm!:FormGroup
  user:User={
    username:'',
    password:''
  }
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){

  }
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.debug(res)
          this.auth.setSession(res)
          
          this.router.navigate(['/applications'])
        },
        error:(err)=>{
          console.log(err)
          alert(err?.error)
        }
      })
    }
  }
  hideShowPass(){
    this.isText=!this.isText
    this.eyeIcon=this.isText?"fa-eye":"fa-eye-slash"
    this.type=this.isText?"text":"password"
  }
  ngOnInit():void{
    this.loginForm=new FormGroup({
      username:new FormControl(this.user.username,[
        Validators.required,
        Validators.minLength(4)
      ]),
      password:new FormControl(this.user.password,
        [
          Validators.required,
          Validators.minLength(4)
        ])
    })
  }
  get username(){
    return this.loginForm.get('username')!;
  }
  get password(){
    return this.loginForm.get('password')!;
  }
}
