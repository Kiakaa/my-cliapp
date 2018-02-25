export class StorageUtil {
    //读写本地存储的token
    getToken(): string {
        if (sessionStorage.getItem("X-TOKEN")) {
            return sessionStorage.getItem("X-TOKEN");
        }
        else {
            return "";
        }
    }
    setToken(token:string)
    {
        sessionStorage.setItem("X-TOKEN",token);
    }
    //读写本地存储的accountID
    getAccountID(): string {
        if (sessionStorage.getItem("accountID")) {
            return sessionStorage.getItem("accountID");
        }
        else {
            return "";
        }
    }
    setAccountID(accontId:string){
        sessionStorage.setItem("accountID",accontId)
    }
    //读写本地存储的accountName
    getAccountName(): string {
        if (sessionStorage.getItem("accountName")) {
            return sessionStorage.getItem("accountName");
        }
        else {
            return "";
        }
    }
    setAccountName(accontname:string){
        sessionStorage.setItem("accountName",accontname)
    }
}
