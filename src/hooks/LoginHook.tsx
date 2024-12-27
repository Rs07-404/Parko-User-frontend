import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async({email, password}) => {
        const success = handleInputErrors({email, password});
        if (!success) return;

        setLoading(true);
        try {
            const response = await fetch("api/auth/login",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await response.json();
            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem('user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error:any) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return { loading, login }
}

const handleInputErrors = ({email, password}) => {
    if(!email || !password){
        toast.error('Please fill in all fields');
        return false;
    }

    if(password.length < 6){
        toast.error('Passwords must be at least 6 characters');
        return false;
    }

    return true;
}

export default useLogin;