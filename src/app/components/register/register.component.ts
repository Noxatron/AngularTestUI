import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  type:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  registerForm!:FormGroup
  user:User={
    username:'',
    password:''
  }
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){

  }
  hideShowPass(){
    this.isText=!this.isText
    this.eyeIcon=this.isText?"fa-eye":"fa-eye-slash"
    this.type=this.isText?"text":"password"
  }
  onSignUp(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      this.auth.register(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log("success")
          this.router.navigate(['/'])
        },
        error:(err)=>{
          console.log(err)
          alert(err)
        }
      })
    }
  }
  ngOnInit():void{
    this.registerForm=new FormGroup({
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
    return this.registerForm.get('username')!;
  }
  get password(){
    return this.registerForm.get('password')!;
  }
}
