import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    const unsplashApiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY || '';
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;

    const response = await axios(apiUrl, {
      headers: {
        'Authorization': `Client-ID ${unsplashApiKey}`,
      },
    });

    // Extract relevant data from the response (e.g., results)
    const data = response.data.results;
    const imageData = data[0].urls.raw
    let image = ''

    if (imageData) {
        image = imageData;
    } else if (!imageData) {
        image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/On_the_Border_%2839960085292%29.jpg/1280px-On_the_Border_%2839960085292%29.jpg';
    }

    return NextResponse.json(image); // Send only the image data in the response

  } catch (error) {
    return NextResponse.json({ error: `${error} Failed to fetch geocode` }, { status: 500 });
  }
}
