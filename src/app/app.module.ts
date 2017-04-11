import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MdlModule } from 'angular2-mdl';

import { AppRoutingModule } from './app-routing.module';


import { APP_CONFIG, DEFAULT_APP_CONFIG } from './app.config';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { LibraryModule } from './library/library.module';
import { AboutModule } from './about/about.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // 3rd party modules
    // Ng2BootstrapModule,
    MdlModule,

    // app modules
    CoreModule,
    SharedModule,
    AppRoutingModule,

    HomeModule,
    LibraryModule,
    AboutModule
  ],
  exports: [],
  providers: [{ provide: APP_CONFIG, useValue: DEFAULT_APP_CONFIG }],
  bootstrap: [AppComponent]
})
export class AppModule { }
