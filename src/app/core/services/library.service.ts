import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';

@Injectable()
export class LibraryService {

  private cityLibUrl = 'http://lib.naju.go.kr:9999/KCMS_kolas/BookSearch/BookNomalSearch/MB';  // URL to web API
  private publicLibUrl = 'http://www.najulib.or.kr:8000/kolas3_01/BookSearch/search_result.do';  // URL to web API
  private kepcoLibUrl = 'https://library.kepco.co.kr/sch/sch75_s02.jsp';

  private proxy = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: Http) { }

  getPosts(term?: any): String[] {
    return [];
  }

  getPost(id: number): String[] {
    return [];
  }

  getCityBooks(schKey: string): Observable<String> {
    // search_txt=%EB%82%98%EC%A3%BC&pageno=1&display=50&manage_code=MB,MA&order_by=TITLE&search_type=NORMAL&book_type=BOOK
    let params = new URLSearchParams();
    params.append('search_txt', schKey);
    params.append('pageno', '1');
    params.append('display', '50');
    params.append('manage_code', 'MB,MA');
    params.append('order_by', 'TITLE');
    params.append('search_type', 'NORMAL');
    params.append('book_type', 'BOOK');

    let headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");

    let url = this.proxy + this.cityLibUrl + "?" + params.toString();
    console.log("url => " + url);
    return this.http.get(url, {
        headers : headers
    }).map(this.extractCityData).catch(this.handleError);
  }

  private extractCityData(res: Response) {
    // console.log("response => " + res.text());
    // console.log(res.text().match(/<ul class=\"book_info\">(.*?)<\/ul>/g).pop());

    let html = $.parseHTML( res.text() );

    console.log("start loop !!!!!!!!!!!!!!!!");

    let map = new Map<string, string>();
    map.set('CALL_NO', '');
    map.set('TITLE_INFO', '');
    map.set('AUTHOR', '');
    map.set('PUBLISHER', '');
    map.set('REG_NO', '');
    map.set('SHELF_LOC_NAME', '');
    map.set('REC_KEY', '');
    map.set('LIB_CODE', '');
    map.set('LIB_NAME', '');
    map.set('RETURN_PLAN_DATE', '');

    let books:Array<Map<String, String>> = [];
    let keys = Array.from( map.keys() );
    for (let kidx in keys) {
      let findKey = "input[type='hidden'][id^='" + keys[kidx] + "']";
      $(html).find(findKey).each(function (index, element) {
        if (kidx === "0") {
          let newMap = new Map<string, string>();
          newMap.set(keys[kidx], $(element).val());
          books.push(newMap);
        } else {
          books[index].set(keys[kidx], $(element).val());
        }
        /*
        console.log(element);
        console.log($(element).prop("name"));
        console.log($(element).val());
        */
      });
    }
    console.log(books);

    console.log("finish loop !!!!!!!!!!!!!!!!");
    let body = {books: books}; // res.json();
    return body || { };
  }

  getPublicBooks(schKey: string): Observable<String> {
    let params = new URLSearchParams();
    params.append('jongbook', '');
    params.append('field1', 'IAL');
    params.append('value1', schKey);
    params.append('aon1', 'AND');
    params.append('field2', 'IT');
    params.append('value2', '');
    params.append('aon2', 'AND');
    params.append('field3', 'IA');
    params.append('value3', '');
    params.append('aon3', 'AND');
    params.append('buho1', 'SIB');
    params.append('buhovalue1', '');
    params.append('aon4', 'AND');
    params.append('buho2', 'KDC');
    params.append('buhovalue2', '');
    params.append('aon5', 'AND');
    params.append('buhovalue3', '');
    params.append('univname', '');
    params.append('aon6', 'AND');
    params.append('buhovalue4', '');
    params.append('govname', '');
    params.append('sort', 'RK DESC');
    params.append('msa', '');
    params.append('formclass', '');
    params.append('textlang', '');
    params.append('simplelang', '');
    params.append('startyear', '');
    params.append('endyear', '');
    params.append('limitpage', '250');
    params.append('local', '');
    params.append('x', '0');
    params.append('y', '0');
    params.append('startpage', '1');
    params.append('mode', '0');

    var headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
    return this.http.post(this.proxy + this.publicLibUrl, params, { headers : headers }).map(this.extractPublicData).catch(this.handleError);
  }

  private extractPublicData(res: Response) {
    // console.log("response => " + res.text());
    // console.log(res.text().match(/<ul class=\"book_info\">(.*?)<\/ul>/g).pop());
    let html = $.parseHTML( res.text() );


    let map = new Map<string, string>();
    map.set('CALL_NO', '');
    map.set('TITLE_INFO', '');
    map.set('AUTHOR', '');
    map.set('PUBLISHER', '');
    map.set('REG_NO', '');
    map.set('SHELF_LOC_NAME', '');
    map.set('REC_KEY', '');
    map.set('LIB_CODE', '');
    map.set('LIB_NAME', '');
    map.set('RETURN_PLAN_DATE', '');

    let books:Array<Map<String, String>> = [];
    // 		번호  표제  저자  출판사   발행년도    자료실     자료구분    목차    초록
    let keys:Array<string> = ['CALL_NO', 'TITLE_INFO', 'AUTHOR', 'PUBLISHER', 'PUBLISHER_YEAR', 'SHELF_LOC_NAME', 'REC_KEY', ];

    console.log("start loop !!!!!!!!!!!!!!!!");

    $(html).find('td.table table tbody tr').each(function (trIdx, trElement) {
      if (trIdx > 1) {
        let newMap = new Map<string, string>();
        $(trElement).find('td').each(function (tdIdx, tdElement) {
          if (keys.length > tdIdx) {
            newMap.set(keys[tdIdx], $(tdElement).text());
          }
        });
        books.push(newMap);
      }
    });
    console.log(books);

    console.log("finish loop !!!!!!!!!!!!!!!!");
    let body = {books: books}; // res.json();
    return body || { };
  }

  getKepcoBooks(schKey: string): Observable<String> {
    let params = new URLSearchParams();

    params.append('page', '1');
    params.append('disNum', '100');
    params.append('sort_nm', '');
    params.append('sort_flag', '');
    params.append('chkNums', '');
    params.append('old_searchWord', schKey);
    params.append('p_searchWord1', '');
    params.append('p_searchWord2', '');
    params.append('p_searchWord3', '');
    params.append('p_searchWord4', '');
    params.append('flag', '');
    params.append('tab', 'GM');
    params.append('tabno', '');
    params.append('pageMove', '');
    params.append('nameBlauzing', '');

    var headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");

    return this.http.post(this.proxy + this.kepcoLibUrl, params, {
        headers : headers
    }).map(this.extractKepcoData).catch(this.handleError);
  }

  private extractKepcoData(res: Response) {
    // console.log("response => " + res.text());
    // console.log(res.text().match(/<ul class=\"book_info\">(.*?)<\/ul>/g).pop());
    let html = $.parseHTML( res.text() );

    console.log("start loop !!!!!!!!!!!!!!!!");

    console.log(html);

    $(html).find("tr[id^='listHtml']").each(function (index, element) {
      console.log(element);
    });

    console.log("finish loop !!!!!!!!!!!!!!!!");
    let body = {data: ""}; // res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log("------------------------error-------------------------");
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
