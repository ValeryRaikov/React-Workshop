import { useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        try {
            const result = await login(email, password);

            changeAuthState(result);
        } catch (err) {
            console.error(err.message);
        }
    }

    return loginHandler;
}