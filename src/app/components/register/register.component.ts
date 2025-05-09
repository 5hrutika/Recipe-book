import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user:{email:string,password:string} = {email:"",password:""}
  constructor(private userService:UserService,private router:Router){}
  onSubmit(){
    this.userService.register(this.user).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/dashboard']);
    })
  }

}
