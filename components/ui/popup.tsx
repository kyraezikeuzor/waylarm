'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { DisasterType } from '@/types'

import { X } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

import { getGeocode, formatDeclarationTitle } from '@/lib/utils'


export const PopupImage = (
    {disaster}:{disaster:DisasterType}
  ) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
        const fetchPhotoUrl = async () => {
            try {
                setLoading(true);
                const photo = await axios.get(`/api/unsplash?query=${disaster.designatedArea},${disaster.state}`)
                if (photo) {
                    setPhotoUrl(photo.data)
                } else {
                    setError('No photos available for this location.');
                }
            } catch (error) {
                console.error('Error fetching photo:', error);
                setError('No photos available for this location.');
            } finally {
                setLoading(false);
            }
        } 
        fetchPhotoUrl();
      }, [disaster]);
  
    if (loading) {
      return <Skeleton className="h-[250px] w-full rounded-lg" />;
    }
  
    if (error) {
        return <div>{error}</div>;
    }
  
    return (
      <div>
        {photoUrl ? 
            <img src={photoUrl} alt="Location" className='h-[250px] w-full rounded-lg' />  :
            <Skeleton className="h-full w-full rounded-lg" />
        }
      </div>
    );
  };
  
export const Popup =  (
    {disaster, onClickOut}:{disaster: DisasterType, onClickOut: () => void}
  ) => {

    const [geocode, setGeocode] = useState()
    
    useEffect(()=>{
        const fetchGeocode = async () => {
            const data = await getGeocode(`${disaster.designatedArea}, ${disaster.state}`)
            const geocodeData = data.data
            setGeocode(geocodeData)
        }
        fetchGeocode()
    })
  
    return (
        <div className='w-80 lg:w-1/4 2xl:w-1/6 ease-in-out backdrop-blur bg-background/75 py-2 absolute z-[99999] top-20 right-20 rounded-xl shadow-2xl border border-border'>
            <div className='relative flex flex-col space-y-2 '>
                <span onClick={()=>onClickOut()} className='bg-background absolute top-1 right-2 w-6 h-6 rounded-full p-1 flex flex-col items-center cursor-pointer'>
                    <X className='text-foreground'/>
                </span>
                <div className='flex flex-row flex-wrap space-x-2 items-center px-3'>
                    <span className='text-lg font-semibold'>
                        {formatDeclarationTitle(disaster.declarationTitle)}
                    </span>
                    <span
                      className={`
                          ${disaster.incidentType.toLowerCase() === 'hurricane' ? 'bg-red-100' :
                          disaster.incidentType.toLowerCase() === 'fire' ? 'bg-orange-100' :
                          disaster.incidentType.toLowerCase() === 'flood' ? 'bg-blue-100' :
                          disaster.incidentType.toLowerCase() === 'tornado' ? 'bg-purple-100' :
                          disaster.incidentType.toLowerCase() === 'earthquake' ? 'bg-brown-100' : 
                          disaster.incidentType.toLowerCase() === 'tropical storm' ? 'bg-indigo-300' :
                          disaster.incidentType.toLowerCase() === 'severe storm' ? 'bg-purple-300' :
                          ''} 
                          text-xs font-medium w-fit py-[1px] px-4 rounded-full text-black
                      `}
                    >
                      {disaster.incidentType}
                  </span>
                </div>
                <div className='px-3'>
                    <PopupImage
                      disaster={disaster}
                    />
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div className='w-1/2 flex flex-col gap-1 px-3'>
                        <span className='text-gray-500 text-sm'>Disaster Timespan</span>
                        <div className='flex flex-col  text-sm'>
                            <span>{new Date(disaster.incidentBeginDate).toDateString()} -</span>
                            <span>{disaster.incidentEndDate ? new Date(disaster.incidentEndDate).toDateString() : 'Present Day'}</span>
                        </div>
                    </div>
                    <hr className='h-16 w-[2px] bg-border'/>
                    <div className='w-1/2 flex flex-col gap-1 px-3'>
                        <span className='text-gray-500 text-sm'>Location</span>
                        <span className='font-semibold text-base leading-5'>{disaster.designatedArea}, {disaster.state}</span>
                        <span className='font-semibold text-base leading-5'>{geocode}</span>
                    </div>
                </div>
                <hr className='w-full h-1 bg-border'/>
                <div className='w-full flex flex-col gap-1 px-3'>
                    <span className='text-gray-500 text-sm'>Incident Details</span>
                    <div className='w-full flex flex-col text-sm'>
                        <span>Last Updated: {new Date(disaster.lastRefresh).toDateString()}</span>
                        <span>Disaster Number: {disaster.disasterNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    )
  }