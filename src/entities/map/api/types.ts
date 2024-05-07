export interface MapItem {
  id: string;
  number: number;
  name: string;
  available: number;
  coordinates: [string, string];
}

export interface GameResultData {
  user: string;
  longitude: string;
  latitude: string;
  city: string;
}
