import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private routes: Router, private userService: UserService) { }
  addsucessfully =false;
  dateinvalid = false;
  userdata: FormGroup = new FormGroup({
    name: new FormControl('Saif Ali', [Validators.required, Validators.maxLength(10),Validators.minLength(3)]),
    dob: new FormControl('01.09/2020', [Validators.required, ]),
    email: new FormControl('abc@gmail.com', [Validators.required,
                                            Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$') ]),
    phone: new FormControl('+911234567890', [Validators.required,
       Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$') ]),
    pass: new FormControl('12345678',[Validators.required, Validators.minLength(8), Validators.maxLength(16) ])
   
  }
  )

  datevalidation(){
  
    let year = new Date(this.userdata.controls.dob.value).getFullYear();
  
    let tody = new Date().getFullYear();
    
    let date = tody - year
   
    if(!(date> 18)){
       this.dateinvalid = true;
      
    }
    else{
      this.dateinvalid = false;
    }
  }
  onsubmit() {
    
      this.userService.userregister(JSON.stringify(this.userdata.value)).subscribe(
        data => {
          console.log( data)
          this.addsucessfully = true;
        },
        error => { console.log(error) }
      )
      setTimeout(()=>{
        this.routes.navigate(["login"])
      },2000)
  }

  ngOnInit() {
  }

}
