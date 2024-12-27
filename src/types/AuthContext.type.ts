import { Dispatch, SetStateAction } from "react";
import { User } from "./User.type";

export type AuthContextType = {
    authUser: User | null;
    setAuthUser: Dispatch<SetStateAction<User | null>>;
}