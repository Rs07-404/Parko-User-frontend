// types.ts
export interface Location {
  type: 'Point';
  coordinates: [number, number];
}

export interface ParkingSpot {
  _id: string;
  spotNumber: string;
  location: Location;
  sensorId: string;
  status: 'available' | 'occupied';
  createdAt?: string;
  updatedAt?: string;
}
