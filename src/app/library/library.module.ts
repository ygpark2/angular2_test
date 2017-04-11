import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';

import { MdlModule } from 'angular2-mdl';

@NgModule({
  imports: [
    // CommonModule,
    SharedModule,
    MdlModule,
    LibraryRoutingModule,
  ],
  declarations: [LibraryComponent]
})
export class LibraryModule { }
