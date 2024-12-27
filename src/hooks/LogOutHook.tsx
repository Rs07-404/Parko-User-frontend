import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast";


export const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/auth/logout', {
                method: "POST",
                headers: {"content-type": "application/json"}
            })

            const data = await response.json();
            if(data.error){
                throw new Error(data.error);
            }
            setAuthUser(null);
        } catch (error) {
            // throw new Error(data.error)
            toast.error("Error Logging Out");
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}
