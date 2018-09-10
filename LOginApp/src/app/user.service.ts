import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

userregister(body:any){
  console.log(body)
return this.http.post('http://127.0.0.1:3000/users/register',body,{
  observe:"body",
  headers:new HttpHeaders().append("Content-Type","application/json")
});
}

userlogin(body:any){
  console.log(body)
return this.http.post('http://127.0.0.1:3000/users/login',body,{
  observe:"body",
  withCredentials:true,
  headers:new HttpHeaders().append("Content-Type","application/json")
});
}


}

   