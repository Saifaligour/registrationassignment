import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private routes: Router, private userservice:UserService) { }
  userdata: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('',Validators.required)  

  }
  )

  goSignin() {
    this.routes.navigate(['signin'])
  }


  
  login() {
    if (!this.userdata.valid) {
      console.log('invalid')
    }
    else {

      this.userservice.userlogin(JSON.stringify(this.userdata.value)).subscribe(
        (data)=>{
        console.log(data);
        this.routes.navigate(['userhome']);
        (err)=>{
           console.log(err)
         }
      })
    }
  }


  ngOnInit() {
  }

}
