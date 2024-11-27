import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";

type DisasterType = {
    disasterNumber:number,
    state:string,
    declarationDate:string,
    incidentType:string,
    declarationTitle:string,
    incidentBeginDate:string,
    incidentEndDate:string,
    disasterCloseoutDate:string,
    fipsStateCode:string,
    fipsCountyCode:string,
    placeCode:string,
    designatedArea:string,
    incidentId:string;
    lastRefresh:string;
}

type CountyType = [
    name: string,   // County name
    state: string,  // State code
    county: string  // County code
]