import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { MdlModule } from 'angular2-mdl';

@NgModule({
  imports: [
    SharedModule,
    MdlModule,
    SigninRoutingModule
  ],
  declarations: [SigninComponent]
})
export class SigninModule { }
