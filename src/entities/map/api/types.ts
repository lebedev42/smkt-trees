export interface MapItem {
  id: string;
  number: number;
  name: string;
  available: number;
  lat?: string;
  lng?: string;
}

export interface GameResultData {
  user: string;
  longitude: string;
  latitude: string;
  city: string;
  sector: number;
}
