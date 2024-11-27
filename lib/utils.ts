import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDeclarationTitle(title: string) {
  return title.toLowerCase().replace(/(^|\s)\w/g, letter => letter.toUpperCase());
}

export async function getGeocode(place:string) {
  const geocodeFetchUrl = `/api/geocode?place=${place}`;
  const geocodeFetchResponse = await axios.get(geocodeFetchUrl);
  const latitude = geocodeFetchResponse.data.lat;
  const longitude = geocodeFetchResponse.data.lng;
  const geocode = geocodeFetchResponse.data.features[0].geometry.coordinates

  return geocode
}