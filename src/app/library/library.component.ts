import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { LibraryService } from '../core/services/library.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-library',
  // providers: [LibraryService], // Look at core.module.ts file
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {

  q: string = '';
  sub: Subscription;
  indeterminate: boolean = true;
  hideLoadingElement: boolean = true;
  hideResultElement: boolean = true;

  disableCityLib: boolean = false;
  disablePublicLib: boolean = false;
  disableKepcoLib: boolean = true;
  // posts: Post[];

  combinedResult: Object = { public: [], city: [] };

  constructor(private libraryServcie : LibraryService) {}

  onSearch() {
    this.hideResultElement = true;
    this.hideLoadingElement = false;
    console.log("search ===========> " + this.q);

    Observable.forkJoin(
      this.libraryServcie.getPublicBooks(this.q),
      this.libraryServcie.getCityBooks(this.q)
    ).finally(() => {
      this.hideLoadingElement = true;
      this.hideResultElement = false;
    }).subscribe(res => {
    
      this.combinedResult = { public:res[0], city:res[1] };
      console.log(this.combinedResult);
    
    });

    console.log("result ===========> " + this.combinedResult);
    /*
    this.libraryServcie.getPublicBooks(this.q).subscribe(
      success => {
        if(success) {
            console.log("get public library books ----------------------------    -");
            console.log(success);
            this.hideResultElement = false;
        }
      },
      error => console.log("login did not work!")
    );

    this.libraryServcie.getCityBooks(this.q).subscribe(
      success => {
        if(success) {
            console.log("get city library books ----------------------------    -");
            console.log(success);
        }
      },
      error => console.log("login did not work!")
    );

    this.libraryServcie.getKepcoBooks(this.q).subscribe(
      success => {
        if(success) {
            console.log("get kepco library books ----------------------------    -");
            console.log(success);
        }
      },
      error => console.log("login did not work!")
    );
    */
  }

  tabChanged(evt) {
    console.log(evt);
  }

  ngOnInit() {
    console.log("library component init !!!!!!!1");
    // this.search();
  }

  ngOnDestroy() {
    // if (this.sub) {
    //   this.sub.unsubscribe();
    // }
  }

}