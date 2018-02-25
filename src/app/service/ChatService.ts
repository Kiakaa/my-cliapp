import {Injectable} from "@angular/core";
import {HttpUtil} from "../util/http.util";
import { error } from "util";

@Injectable()//缺少此行页面无法显示。
export class ChatService{
  private baseUrl = "/fcat-user/v1/tUser";
  constructor(private httpUtil: HttpUtil){
  }
  Login(account:string)
  {
    let url = "/login/login";    
    let formData: FormData = new FormData();
    formData.append('account', account);
    return  this.httpUtil.postForm(url,formData)
    
  }
  GetLoginUserInfo()
  {
    let url="/chat/GetLoginUserInfo";
    return this.httpUtil.postWithNopara(url);
  }
  getChatHistory(){
    let url = "/home/GetNGChatHistorys";
    return  this.httpUtil.get(url);/*
    .subscribe((success)=>
    {
      console.log(success);
    },(error)=>{
      console.log(error);
    });*/
  }

  setLocalSessionInfo(sessionInfo:any){
    sessionStorage.setItem("sessionInfo",JSON.stringify(sessionInfo));
  }

  getLocalSessionInfo():any{
    return JSON.parse(sessionStorage.getItem("sessionInfo"));
  }
  setLocalAuthorityTElements(tElements:any){
    sessionStorage.setItem("tElements",JSON.stringify(tElements));
  }

  getLocalAuthorityTElements():any{
    return JSON.parse(sessionStorage.getItem("tElements"));
  }

  getList(currentPage:number, pageSize:number) {
    let param = "?pageSize="+pageSize+"&pageNum="+currentPage;
    let url = this.baseUrl+"/listByPage"+param;
    return this.httpUtil.get(url);
  }
  getListByGroupId(groupId:number) {
    let url = this.baseUrl+"/getListByGroupId/"+groupId;
    return this.httpUtil.get(url);
  }

  getByKey(term:any) {
    let url = this.baseUrl+"/getList/"+term;
    return this.httpUtil.get(url);
  }

  getAuthorityByUsername(username:string):any {
    let url = this.baseUrl+"/getAuthority/"+username;
    return this.httpUtil.get(url);
  }

  logout() {
    let url = "/logout";
    return this.httpUtil.get(url);
  }

}
