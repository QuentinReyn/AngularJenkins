import { Choice } from "./choice.model";

export interface User{
    id_user: number;
    login: string;
    isAdmin: boolean;
    choice: Choice[];
}