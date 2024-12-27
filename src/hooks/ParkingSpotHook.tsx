import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const useParkingSpot = () => {
    const { setParkingSpots } = useAppContext()
    const [loading, setLoading] = useState(false);
    const fetchParkingSpots = async()=>{
        try{
            setLoading(true);
            const response = await fetch('/api/parkingSpot/');
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setParkingSpots(data);
        }catch(error: any){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading, fetchParkingSpots}
}

export default useParkingSpot;