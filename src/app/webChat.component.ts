import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';
import {Room} from './room/room.model'

@Component({
    selector: 'web-chat',
    templateUrl: './webChat.component.html',
})

@Injectable()
export class WebChatComponent implements OnInit {
    nickName = "admin";
    isNotOnline = true;
    rom1:Room=new Room("ws://172.20.123.48:4141/chat","聊天室1")
    rom2:Room=new Room("ws://120.79.9.246/chat","聊天室2")
    //rooms: Room[];
    rooms: { url: string, name: string }[] ;
    room:{rul:string,name:string};
    selectedValue="";
    constructor(private toastr: ToastrService) { }
    ngOnInit(): void {
        //this.getChatHistory();
        //this.rooms.push(this.rom1);
        //rooms: Room[this.rom1,this.rom2];
        this.rooms = [
            { "url": "ws://172.20.123.48:4141/chat", "name": "聊天室1" },
            { "url": "ws://120.79.9.246/chat", "name": "聊天室2" }
        ];
        //this.rooms=rs;
        console.log(this.rooms);
    }
    logWebSocket()
    {
        var exampleSocket = new WebSocket("ws://www.immaohai.com/");
    }
    roomSelected()
    {
        this.toastr.info(this.selectedValue);
        console.log(this.selectedValue);
    }
    login()
    {
        //this.toastr.info(room.)
        this.toastr.info(this.selectedValue);
        console.log(this.selectedValue);
    }
}