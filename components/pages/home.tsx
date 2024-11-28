// app/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Link from 'next/link'

import { DisasterType } from '@/types'

import { Rss } from 'lucide-react'
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar"
import { Heading } from '@/components/ui/heading'
import { Disaster } from '@/components/ui/disaster'
import { Combobox } from '@/components/ui/combobox'
import { Clock } from '@/components/ui/clock'
import { MapComponent } from '@/components/ui/map'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Logo } from '@/components/ui/logo'
import { Popup } from '@/components/ui/popup'
import { Separator } from '@/components/ui/separator'
import { Theme } from '@/components/ui/theme'

import { states } from '@/data/states'

export default function Home() {
  const [selectedState, setSelectedState] = useState("")
  const [disasters, setDisasters] = useState<DisasterType[]>([])

  useEffect(() => {
    const getDisasters = async () => {
      try {
        const response = await axios.get('/api/disasters');
        setDisasters(response.data.DisasterDeclarationsSummaries)
      } catch (error) {
        console.error('Error fetching disasters:', error);
      }
    };
    getDisasters()
  }, [])

  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType | null>(disasters[0])
  const handleDisasterSelect = (disaster: DisasterType) => {
    setSelectedDisaster(disaster)
  }

  const [filteredDisasters, setFilteredDisasters] = useState<DisasterType[]>(disasters)

  useEffect(()=>{
      if (selectedState) {
        setFilteredDisasters(disasters.filter((item) => {
          return item.state === selectedState;
        }));
      } else {
        setFilteredDisasters(disasters)
      }
  },[selectedState, disasters])


  return (
    <SidebarProvider>
      <Sidebar className='bg-background/75 backdrop-blur'>
        <SidebarContent  className='py-2 px-2 bg-background/80 backdrop-blur overflow-y-hidden'>
          <SidebarGroup className='w-full flex flex-col space-y-1'>
            <div className='hidden lg:flex justify-start items-center absolute top-2 left-2 right-2'>
              <Logo/>
            </div>
            <br className='hidden lg:block'/>
            <br className='hidden lg:block'/>
            <div className='flex flex-col gap-2'>
              <span className='flex flex-row items-center gap-1 w-fit bg-blue-500 text-white rounded-xl px-3 text-sm'><Rss className='w-3 h-3 text-white'/> Live Updates</span>
              <Heading as='h1'>
                Live Active Natural Disasters 
              </Heading>
            </div>
            <div className='flex flex-col'>
              {disasters && disasters.length > 0 && (
                <p className='text-gray-600'>
                  Last Updated: {new Date(disasters[0].lastRefresh).toDateString()}
                </p>
              )}
              <p className='text-sm text-gray-400'>
                Disaster data received from <Link className='underline underline-gray-400' href='https://www.fema.gov/about/reports-and-data/openfema'>FEMA</Link>, the United States Federal Emergency Management Agency.
              </p>
            </div>
          </SidebarGroup>
          <Separator/>
          <SidebarGroup className='w-full h-full flex flex-col space-y-1'>
            <Heading as="h2">Showing {filteredDisasters.length} disaster(s) in {selectedState || "all states"}</Heading>
            <Combobox
              list={states}
              category="state"
              onValueChange={(value) => setSelectedState(value)}
            />
            <ScrollArea className='w-full h-full max:h-[600px] flex-col '>
              {filteredDisasters?.map((item,index) => (
                <Disaster 
                  key={index}
                  onSelect={()=>{handleDisasterSelect(item)}} 
                  onDeselect={()=>{setSelectedDisaster(null)}}
                  disaster={item}
                  selectedDisaster={selectedDisaster}
                />
              ))}
            </ScrollArea>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className='w-full bg-transparent'>
      <SidebarTrigger className='absolute z-[99]' />
        <div className='lg:hidden absolute top-0 right-0 p-2 z-[9999]'>
          <Logo/>
        </div>
        <MapComponent 
          disasters={disasters} 
          selectedDisaster={selectedDisaster || disasters[0]}
          setSelectedDisaster={setSelectedDisaster}  
        />
        <div>
          {selectedDisaster != null &&
            <Popup
              onClickOut={()=>setSelectedDisaster(null)}
              disaster={selectedDisaster}
            />
          }
        </div>
        <div className='w-full flex flex-col items-end pr-5 lg:pr-2 absolute left-2 top-12 lg:top-0  z-[99999]'>
          <Theme/>
        </div>
        <div className='absolute right-28 top-3 lg:hidden z-[9999]'>
          <Clock/>
        </div>
      </main>
    </SidebarProvider>
  );
}


