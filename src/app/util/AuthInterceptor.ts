import { Injectable, Inject, Injector } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ChatService } from "../service/ChatService";

import { StorageUtil } from "./storage.util"
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private storageUtl: StorageUtil) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone(
            {
                headers: req.headers.set('X-TOKEN', this.storageUtl.getToken())
            }
        );
        return next.handle(clonedRequest).map(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 401) {
                    // JWT expired, go to login
                }
                this.storageUtl.setToken(event.headers.get("X-TOKEN"))  
            }
            return event;
        }
        )
    }
}