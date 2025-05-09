import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user:{email:string,password:string} = {email:"",password:""}
  constructor(private router: Router,private userService:UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit()
{
  console.log("insider");
  console.log(this.user);
  this.userService.login(this.user).subscribe((data)=>{
    console.log(data);
    this.router.navigate(['/dashboard']);
  })
}
}
