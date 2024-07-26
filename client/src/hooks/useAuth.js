import { login } from "../api/authApi";

export const useLogin = () => {
    const loginHandler = async (email, password) => {
        try {
            const result = await login(email, password);
        } catch (err) {
            console.error(err.message);
        }
    }

    return loginHandler;
}