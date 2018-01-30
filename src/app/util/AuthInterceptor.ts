import {Injectable,Inject,Injector} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpResponse} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { ChatService } from "../service/ChatService";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone(
            {
            headers: req.headers.set('X-TOKEN',this.getToken())
            }
    );
        return next.handle(clonedRequest).map(event => {
            if (event instanceof HttpResponse) {
              if (event.status === 401) {
                // JWT expired, go to login
              }
              sessionStorage.setItem("X-TOKEN",event.headers.get("X-TOKEN"))  
              console.log(event.headers.get("X-TOKEN"));
            }            
            return event;
          }
        )
    }

    getToken():string {
        if(sessionStorage.getItem("X-TOKEN"))
        {
            return sessionStorage.getItem("X-TOKEN");
        }
        else
        {
            return "";
        }
        
    }
}