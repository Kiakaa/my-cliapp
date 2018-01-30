import {Injectable} from "@angular/core";
//import {Http, Response, RequestOptions, Headers}          from '@angular/http';
//import {HttpClient, HttpResponse, HttpRequest,HttpHeaders} from '@angular/common/http';
import {HttpClient,HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Config} from "../app-config";
//import { HttpHandler } from "@angular/common/http/src/backend";
import { HttpHeaderResponse } from "@angular/common/http";
import { Body } from "@angular/http/src/body";
import { HttpParams } from "@angular/common/http";
import { Response } from "@angular/http";
import { HttpResponse } from "@angular/common/http/src/response";


@Injectable()
export class HttpUtil{
  private baseUrl:any;
  private withCredentials:string = "true";
  constructor(private config:Config, private http: HttpClient){
    let app = config.appConfig;
    this.baseUrl = app.baseUrl;
  }

  post(url:string, param:string){
    url = this.baseUrl + url;
    //let headers = new Headers({ 'X-Requested-With' :'XMLHttpRequest'});
    //let options = new RequestOptions({ withCredentials: this.withCredentials});
    
    //let options:HttpHeaders = new HttpHeaders({ 'withCredentials' :this.withCredentials});
    //let headers:HttpHeaders = new HttpHeaders({ 'X-Requested-With' :'XMLHttpRequest'});
    //noinspection TypeScriptValidateTypes
    /*
    ,
        {
          headers: new HttpHeaders().set('withCredentials', this.withCredentials)
        }, 
        {
      headers: new HttpHeaders().set('X-Requested-With','XMLHttpRequest')
    }
         */
        let paraop :HttpParams = new HttpParams();
        paraop.append("account",param);
    return this.http.post(url, paraop).subscribe(
      success=>{
        console.log(success);
      },this.extractData
    );
      /*.map(this.extractData)
      .catch(this.handleError);*/

  }
  postForm(url:string, param?:any){
    url = this.baseUrl + url;
    //let headers = new Headers({ 'X-Requested-With' :'XMLHttpRequest'});
    //let options = new RequestOptions({ withCredentials: this.withCredentials});
    //let options = new HttpHeaders({ 'withCredentials' :this.withCredentials});
    let formData: FormData = new FormData();
    formData.append('account', param);
    /*
    , {
      headers: new HttpHeaders().set('withCredentials', this.withCredentials)
    }
     */
    //noinspection TypeScriptValidateTypes
    return this.http.post(url, formData).subscribe(
      (success)=>{
        console.log(success);
      },(error)=>{
        console.log(error);
      }
    );

  }


  put(url:string, param?:any){
    url = this.baseUrl + url;
    //url = this.getSessionIdUrl(url);
    //let headers = new Headers({ 'X-Requested-With' :'XMLHttpRequest'});
    //let options = new RequestOptions({ withCredentials: this.withCredentials});
    let options = new HttpHeaders({ 'withCredentials' :this.withCredentials});
    //noinspection TypeScriptValidateTypes
    return this.http.put(url, param,{
      headers: new HttpHeaders().set('withCredentials', this.withCredentials).set('Token', "Token001")
    })
      .map(this.extractData)
      .catch(this.handleError);

  }

  delete(url:string){
    url = this.baseUrl + url;
    //url = this.getSessionIdUrl(url);
    //let headers = new Headers({ 'X-Requested-With' :'XMLHttpRequest'});
    //let options = new RequestOptions({ withCredentials: this.withCredentials});
    let options = new HttpHeaders({ 'withCredentials' :this.withCredentials});
    //noinspection TypeScriptValidateTypes
    return this.http.delete(url, {
      headers: new HttpHeaders().set('withCredentials', this.withCredentials).set('Token', "Token001")
    })
      .map(this.extractData)
      .catch(this.handleError);

  }

  get(url:string){
    url = this.baseUrl + url;
    //url = this.getSessionIdUrl(url);
    //let headers = new Headers({ 'X-Requested-With' :'XMLHttpRequest'});
    //let options = new RequestOptions({ withCredentials: this.withCredentials});
    let options = new HttpHeaders({ 'withCredentials' :this.withCredentials});
    //noinspection TypeScriptValidateTypes
    /* 
    ,{
      headers: new HttpHeaders().set('withCredentials', this.withCredentials).set('Token', "Token001")
    }
     */
    return  this.http.get(url).subscribe(
      success=>{
        console.log(success);
      },error=>{
        console.log(error);
      }//this.extractData
    );
      /*.map(this.extractData)
      .catch(this.handleError);*/
  }


  private extractData(res: Response) {
    //sessionStorage.setItem("X-Token",res.headers.get("x-token"));
    console.log(res);
    return res;
  }

   private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);//body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
