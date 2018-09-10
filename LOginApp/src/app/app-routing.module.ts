import { NgModule,  } from '@angular/core';

import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { RegisterComponent } from './register/register.component';

const routes:Routes=[
  {
    path:'',redirectTo:'userhome', pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signin',component:RegisterComponent
  },
  {
    path:'userhome',component:UserhomeComponent
  }
  
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [
    
  ],
  exports:[RouterModule]

})
export class AppRoutingModule { }
