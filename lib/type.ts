import type { GeoPoint } from "@firebase/firestore-types";
import { Timestamp } from "firebase/firestore";

export type Photo = {
  date: Date;
  url: string;
  place: string;
  fullPath: string;
  uid: string;
  fav: number;
};

export type UserSettings = {
  nickName: string;
  modeOfTransportation: string;
  departureTime: {
    date0110: string | null;
    date0111: string | null;
    date0112: string | null;
  };
};

export type Place = {
  name: string;
  congestion: number;
  center: GeoPoint | null;
  latitude: number | null;
  longitude: number | null;
  isOpen: boolean;
  openTime: number;
  closeTime: number;
  updateAt: Timestamp;
};
