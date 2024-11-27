import axios from 'axios';

export async function GET() {
    const now = new Date();
    const dateStop = new Date(now.setMonth(now.getMonth() - 1));
    const dateStopFormat = dateStop.toISOString();

    try {
        const response = await axios.get(`https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$select=disasterNumber,state,declarationDate,incidentType,declarationTitle,incidentBeginDate,incidentEndDate,disasterCloseoutDate,fipsStateCode,fipsCountyCode,placeCode,designatedArea,incidentId,lastRefresh&$filter=declarationDate gt '${dateStopFormat}'&$orderby=declarationDate desc`);
        return Response.json(response.data);
    } catch (error) {
        return Response.json({error}, { status: 500 });
    }
}