import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";


export const useLocationHook = () => {
    const { setPreciseLocation, setApproximateLocation  } = useAppContext();
    const [ loading, setLoading ] = useState(false);

    const getPreciseLocation = () => {
        setLoading(true);
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const { latitude, longitude } = position.coords;
              setPreciseLocation({ latitude, longitude });
              setLoading(false);
            },
            (error: GeolocationPositionError) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  toast.error("The permission to access location is denied");
                  break;
                case error.POSITION_UNAVAILABLE:
                  toast.error("Location information is unavailable.");
                  break;
                case error.TIMEOUT:
                  toast.error("The request to get user location timed out.");
                  break;
                default:
                  toast.error("An error occurred.");
                  break;
              }
            }
          );
        } else {
          toast.error("Geolocation is not supported by this browser.");
        }

        setLoading(false);
      };

      const getApproximateLocation = async() => {
        try{
          const geoLocationresponse = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=bdd9c21977ed42b69becc92c9ed8ca63");
          const country_data = await geoLocationresponse.json();
          const country = country_data.country_name;
          const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
          const data = await response.json();
          const location = data[0].latlng;
          console.log(location);
          setApproximateLocation({latitude:location[0], longitude:location[1]})
        }catch(e:any){
          console.log(e.message)
        }
      }
    return { loading, getPreciseLocation, getApproximateLocation }
}