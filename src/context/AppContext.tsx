import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ParkingSpot } from "../types/ParkingSpot.type";

export const AppContext = createContext<
  | {
      screenWidth: number;
      setScreenWidth: React.Dispatch<SetStateAction<number>>;
      parkingSpots: ParkingSpot[] | [] | null;
      setParkingSpots: React.Dispatch<SetStateAction<ParkingSpot[] | [] | null>>;
      selectedSpot: ParkingSpot | null;
      setSelectedSpot: React.Dispatch<SetStateAction<ParkingSpot | null>>;
      preciseLocation: {latitude: number, longitude: number} | null;
      setPreciseLocation: React.Dispatch<SetStateAction<{latitude: number, longitude: number} | null>>;
      approximateLocation:  {latitude: number, longitude: number} | null;
      setApproximateLocation: React.Dispatch<SetStateAction<{latitude: number, longitude: number} | null>>;
    }
  | undefined
>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[] | [] | null>([]);
  const [ selectedSpot, setSelectedSpot ] = useState<ParkingSpot | null>(null);
  const [ preciseLocation, setPreciseLocation ] = useState<{latitude: number, longitude: number} | null>(null);
  const [ approximateLocation, setApproximateLocation ] = useState<{latitude: number, longitude: number} | null>(null);
  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        screenWidth,
        setScreenWidth,
        parkingSpots,
        setParkingSpots,
        selectedSpot,
        setSelectedSpot,
        preciseLocation,
        setPreciseLocation,
        approximateLocation,
        setApproximateLocation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
