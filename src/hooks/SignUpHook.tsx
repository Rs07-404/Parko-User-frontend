import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signUp = async({fullName, email, phone, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, email, phone, password, confirmPassword, gender});
        if (!success) return;

        setLoading(true);
        try {
            const response = await fetch("api/auth/signup",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName, email, phone, password, confirmPassword, gender
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
    return { loading, signUp }
}

const handleInputErrors = ({fullName, email, phone, password, confirmPassword, gender}) => {
    if(!fullName || !email || !phone || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields');
        return false;
    }

    if(password.length < 6){
        toast.error('Passwords must be at least 6 characters');
        return false;
    }

    if(password !== confirmPassword){
        toast.error('Passwords do not match.');
        return false;
    }

    return true;
}

export default useSignUp;