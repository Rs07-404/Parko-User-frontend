import { useEffect } from "react";
import Header from "../../components/Header/Header.tsx";
import ParkingMap from "../../components/Map/Map.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
// import { useAuthContext } from "../../context/AuthContext.tsx";
// import { ParkingSpot } from "../../types/ParkingSpot.type.ts";
import useParkingSpot from "../../hooks/ParkingSpotHook.tsx";
import ReservationBox from "../../components/ReservationForm/ReservationForm.tsx";
import { useLocationHook } from "../../hooks/LocationHooks.tsx";


const Home = () => {
  const { parkingSpots } = useAppContext();
  const { loading, getPreciseLocation} = useLocationHook();
  // const { authUser } = useAuthContext();
  const { fetchParkingSpots } = useParkingSpot();
  useEffect(() => {
    fetchParkingSpots();
  },[])


  return (
    <div className="canvasHome">
      <Header />
      <div className="AppContentbody">
        {/* {selectedSpot != null && <ReservationBox />} */}
        <ParkingMap parkingSpots={parkingSpots} />
        <div onClick={getPreciseLocation} className="getLocationButton"><svg xmlns="http://www.w3.org/2000/svg" className={loading?"locationFinding":""} id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,7c-2.757,0-5,2.243-5,5s2.243,5,5,5,5-2.243,5-5-2.243-5-5-5Zm0,7c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Zm10.5-3.5h-.612c-.652-4.315-4.072-7.736-8.388-8.388v-.612c0-.828-.671-1.5-1.5-1.5s-1.5,.672-1.5,1.5v.612C6.184,2.764,2.764,6.185,2.112,10.5h-.612c-.829,0-1.5,.672-1.5,1.5s.671,1.5,1.5,1.5h.612c.652,4.315,4.072,7.736,8.388,8.388v.612c0,.828,.671,1.5,1.5,1.5s1.5-.672,1.5-1.5v-.612c4.316-.652,7.736-4.072,8.388-8.388h.612c.829,0,1.5-.672,1.5-1.5s-.671-1.5-1.5-1.5Zm-10.5,8.5c-3.86,0-7-3.141-7-7s3.14-7,7-7,7,3.141,7,7-3.14,7-7,7Z"/></svg></div>
      </div>
      {/* { authUser?.qrcode && <svg dangerouslySetInnerHTML={{__html: authUser.qrcode}} />} */}
    </div>
  );
};

export default Home;
