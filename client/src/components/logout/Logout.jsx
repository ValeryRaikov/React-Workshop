import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function Logout() {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            try {
                logout();
                navigate('/');
            } catch (error) {
                console.error("Failed to logout:", error);
            }
        };

        handleLogout();
    }, [logout, navigate]);

    return null;
}
