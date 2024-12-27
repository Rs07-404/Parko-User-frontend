import { useState } from "react";
import close_icon from "../../assets/icons/cross.svg";
import { useAppContext } from "../../context/AppContext";
import { ParkingSpot } from "../../types/ParkingSpot.type";
import toast from "react-hot-toast";

const ReservationBox: React.FC<{selectedSpot: ParkingSpot, closeModal: ()=>void}> = ({selectedSpot, closeModal}) => {
    const [ rentPerHour, setRentPerHour ] = useState<number>(20)
    const [ finalPrice, setfinalPrice ] = useState<number>(20);
    const [ time, setTime ] = useState<number>(1);
    const handleChange = (e)=>{
        const time = parseInt(e.target.value);
        const price = time * rentPerHour
        setTime(time);
        setfinalPrice(price);
    }

    const handleSubmit = async () => {
        try {
            const startTime = new Date();
            const endTime = new Date();
            // Add the time passed as a parameter to the current time
            endTime.setHours(endTime.getHours() + time);
    
            const response = await fetch("/api/reservation/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify that the body is JSON
                },
                body: JSON.stringify({
                    parkingSpotId: selectedSpot._id,
                    startTime: startTime.toISOString(), // Convert the Date object to ISO string format
                    endTime: endTime.toISOString(), // Convert the Date object to ISO string format
                }),
            });
    
            // Check if the response is ok (status code 2xx)
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error || "Error Booking Parking Spot");
                return;
            }
    
            // If the reservation is successful
            const data = await response.json();
            toast.success(data.message); // Display success message
            closeModal();
        } catch (e) {
            toast.error("Error Booking Parking Spot");
        }
    };
    
    return (
        <div className="reservationBox">
            <div className="reservationForm">
                <div className="reservationHeader">
                    <div className="reservationHeading">Payment Details for <b>#{selectedSpot?.spotNumber}</b></div>
                    <div className="close" ><img onClick={closeModal} className="closeButton" src={close_icon} alt="" /></div>
                </div>
                <div className="reservationDetails">
                    <div className="bookingForm">
                        <div className="bookingRent">Rent Per Hour: <b>₹{rentPerHour}</b></div>
                        <div className="timeSelect">
                            <div className="head">Parking Time:</div>
                            <select onChange={handleChange}>
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hour</option>
                                <option value="3">3 Hour</option>
                            </select>
                        </div>
                        <div className="totalFee">Total Pay Amount: <b>₹{finalPrice}</b></div>
                    </div>
                    <div className="paymentButton" onClick={handleSubmit}>Pay ₹{finalPrice}</div>
                </div>
            </div>
        </div>
    )
}

export default ReservationBox