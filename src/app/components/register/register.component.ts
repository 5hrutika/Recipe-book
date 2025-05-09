import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,   
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user:{email:string,password:string} = {email:"",password:""}
  loading:boolean = false;
  constructor(private userService:UserService,private router:Router){}
  onSubmit(){
    this.loading = true;
    this.userService.register(this.user).subscribe((data)=>{
     
     setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/dashboard']);

     }, 2000);
      console.log(data);
    })
  }

}
