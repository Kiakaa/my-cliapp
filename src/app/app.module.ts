import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http'
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { APP_CONFIG, HERO_DI_CONFIG }    from './app.config';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HttpUtil} from "./util/http.util";
import { ChatService } from './service/ChatService'
import { Config} from './app-config'
import {AuthInterceptor } from './util/AuthInterceptor'

import {StorageUtil} from "./util/storage.util"
import {WebChatComponent} from "./webChat.component"
import {Room} from "./room/room.model"
@NgModule({
  declarations: [
    AppComponent,WebChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    StorageUtil,
   HttpUtil,ChatService,Config,
   { provide: LocationStrategy, useClass: HashLocationStrategy },
   [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
   ]
  ],
  bootstrap: [WebChatComponent]
})
export class AppModule {  }
