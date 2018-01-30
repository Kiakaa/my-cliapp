import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';
import { HttpUtil } from './util/http.util'
import { ChatService } from './service/ChatService'
import { log } from 'util';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
@Injectable()
export class AppComponent implements OnInit {
    nickName = "";

    isNotOnline = true;
    constructor(//private router:Router,
        private tChatService: ChatService,private toastr:ToastrService) { }
    ngOnInit(): void {
        //this.tChatService.getChatHistory();
    }
    getChatHistory()
    {
         this.toastr.show("getChatHistory");
       console.log(this.tChatService.getChatHistory());
    }
    Login()
    {
        if (this.nickName=="") {
            this.toastr.info("请输入昵称！", "提醒");
            return;
        }
        //this.isNotOnline = false;
        console.log(this.isNotOnline);
        this.tChatService.Login(this.nickName);
    }
}