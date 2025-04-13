import {UserEnum} from "../common/enums/user.enum";

export interface User {
    userId: string;
    username: string;
    age: number;
    gender?: UserEnum
}