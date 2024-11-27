import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.census.gov/data/2010/dec/sf1?get=NAME&for=county:*');
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch counties' }, { status: 500 });
  }
}