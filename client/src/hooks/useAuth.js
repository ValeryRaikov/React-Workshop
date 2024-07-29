import { useContext } from "react";
import { login } from "../api/authApi";
import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useAuthContext();

    const loginHandler = async (email, password) => {
        try {
            const { password: _, ...authData }  = await login(email, password);

            changeAuthState(authData);
        } catch (err) {
            console.error(err.message);
        }
    }

    return loginHandler;
}

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password) => {
        const { password: _, ...authData } = await register(email, password);

        changeAuthState(authData);
    }

    return registerHandler;
}