import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const place = searchParams.get('place') || 'United States of America';
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&pithumbsize=2000&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(place)}&gsrlimit=10`;
    //http://en.wikipedia.org/w/api.php?action=query&titles=Al-Farabi&prop=pageimages&format=json&pithumbsize=100

    
    const response = await axios(apiUrl, {
        headers: {
            'User-Agent': 'NextJsWikimediaSearch/1.0'
        }
    });

    const data = response.data

    let images = []
    let image = ''

    const pages: any[] = Object.values(data.query.pages)

    if (pages) {
        for (let i = 0; i < pages.length; i++) {
            const thumbnail = pages[i].thumbnail;
    
            // Exclude images with 'map', 'flag', or 'pdf' in the source URL
            if (
                thumbnail &&
                thumbnail.source &&
                !thumbnail.source.toLowerCase().includes('map') &&
                !thumbnail.source.toLowerCase().includes('flag') &&
                !thumbnail.source.toLowerCase().includes('pdf')
                
            ) {
                images.push(thumbnail.source);
            }
        }
    }

    if (images.length == 0) {
        image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/On_the_Border_%2839960085292%29.jpg/1280px-On_the_Border_%2839960085292%29.jpg'
    } else if (images.length > 0) {
        image = images[images.length-1]
    }
    
    return Response.json(image);
  } catch (error) {
    return Response.json(`${error} Failed to fetch geocode`, { status: 500 });
  }
}