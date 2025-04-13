import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores";
import { useApi } from "../../hooks";
import { authenticationApi } from "../../apis";
import { useEffect } from "react";
import { message } from "antd";

export const LogoutFunction = () => {
    const { clearCurrentUser, setIsLogout } = useAuthStore();
    const { errorMessage, callApi: logout } = useApi<void>();
    const navigate = useNavigate();

    const handleLogout = async (token: string) => {
        await logout(async () => {
            const sendData = {
            token: token,
            };
            const { data } = await authenticationApi.logout(sendData);
            if (data) {
                message.success(data.message, 3);
                clearCurrentUser();
                setIsLogout();
                localStorage.removeItem("access_token");
                useAuthStore.persist.clearStorage();
                navigate("/login");
            }
        });
    };

    useEffect(() => {
        if (errorMessage) {
        message.error(errorMessage, 3);
        }
    }, [errorMessage]);
    
    return { handleLogout }; 
}