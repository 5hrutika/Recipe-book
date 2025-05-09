import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user:{email:string,password:string} = {email:"",password:""}
  loading:boolean = false;
  constructor(private router: Router,private userService:UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit()
{
  this.loading = true;
  this.userService.login(this.user).subscribe((data)=>{
    console.log(data);
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }, 2000);
  })
}
}
