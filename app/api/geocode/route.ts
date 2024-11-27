import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const place = searchParams.get('place');
    const key = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
    const response = await axios.get(`https://api.maptiler.com/geocoding/${place}.json?key=${key}`);
    return Response.json(response.data);
  } catch (error) {
    return Response.json({error}, { status: 500 });
  }
}