import { User } from "../user/user.model";

export class Message {
    public accountId:string;
    accountName:string;
    updateTime: Date;
    sender: User;
    message: string;
}