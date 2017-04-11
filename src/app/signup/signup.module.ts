import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { MdlModule } from 'angular2-mdl';

@NgModule({
  imports: [
    SharedModule,
    MdlModule,
    SignupRoutingModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
