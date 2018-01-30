import {Injectable} from "@angular/core";
/**
 * Created by F1 on 2017/10/16.
 */
@Injectable()
export class Config{
  public appConfig:any = { 
    baseUrl:"http://localhost:5367"
    //baseUrl:"http://api.immaohai.com/chatapi"
  };
}
