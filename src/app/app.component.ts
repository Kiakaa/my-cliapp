import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';
//import { HttpUtil } from './util/http.util'
import { ChatService } from './service/ChatService'
import { log } from 'util';
import { Message } from './message/message.model';

import { StorageUtil } from "./util/storage.util"
import { HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';

import { User } from './user/user.model';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
@Injectable()
export class AppComponent implements OnInit {
    nickName = "admin";
    isNotOnline = true;
    

    messagesObservable: Message[];
    //messagesObservable: Observable<Message[]>;

    constructor(
        private storageUtl: StorageUtil,
        private tChatService: ChatService, private toastr: ToastrService) { }
    ngOnInit(): void {
        //this.getChatHistory();
    }
    logWebSocket()
    {
        var exampleSocket = new WebSocket("ws://www.immaohai.com/");
    }
    add()
    {
        let xx:User
        xx.id="10";
        xx.name="test";
        let msg =  new Message();
        console.log(msg);
        msg.accountId="10";
        msg.accountName="test";
        //msg.sender = xx;
        msg.message="messge";
        msg.updateTime= new Date("2018/2/7 18:18:59");
        this.messagesObservable.push(msg);
    }
    getChatHistory() {
        //this.toastr.warning("getChatHistory");
        //this.messagesObservable =
        this.tChatService.getChatHistory().subscribe(
            (success:Message[])=>
            {
                this.messagesObservable=success;
            }
        );
    }
    Login() {
        if (this.nickName == "") {
            this.toastr.info("请输入昵称！", "提醒");
            return;
        }
        //this.isNotOnline = false;
        console.log(this.isNotOnline);
        this.tChatService.Login(this.nickName)
            .subscribe(
            (success:HttpResponse<any>) => {
                this.toastr.success("登录成功！");
                if (success["result"]==="True") {
                    this.tChatService.GetLoginUserInfo()
                        .subscribe((res: HttpResponse<any>) => {
                            this.storageUtl.setAccountID(res["accountId"]);
                            this.storageUtl.setAccountName(res["accountName"]);
                            this.toastr.success("账号信息获取成功！");
                        }), (error) => {
                            this.toastr.error("账号信息获取失败！");
                        }
                }
                else {
                    this.toastr.error("登录失败");
                }
            }, (error) => {
                this.toastr.error("err"); console.log(5);
            }
            );
    }
}