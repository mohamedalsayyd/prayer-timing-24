export interface PrayerProps {
  timingsName: string;
  timings: string;
  img: string;
}

export type Cities = {
  [key: string]: CityName;
};
export type CityMap = {
  [key: string]: string;
};
export type Timings = {
  [key: string]: string;
};
export type PrayerArray = { key: string; displayName: string }[];

type CityName = "الاسكندرية" | "القاهرة" | "المنصورة" | "الجيزة" | "سيوة";
