import { Choice } from "./choice.model";

export interface User{
    Id: number;
    Login: string;
    IsAdmin: boolean;
    Password: string;
    Choices: Choice[];
}