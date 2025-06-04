import { Role } from "./role.enum";

export interface CurrentLoggedInUser {
    id: string;
    email: string;
    role: Role;
}