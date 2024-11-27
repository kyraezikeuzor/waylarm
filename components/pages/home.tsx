// app/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

import { states } from '@/data/states'

export default function Home() {
  const [selectedState, setSelectedState] = useState("")
  const [disasters, setDisasters] = useState<DisasterType[]>([])

  useEffect(() => {
    const getDisasters = async () => {
      try {
        const response = await axios.get('/api/disasters');
        setDisasters(response.data.DisasterDeclarationsSummaries)
      } catch (error:any) {
        console.error('Error fetching disasters:', error.message);
      }
    };
    getDisasters()
  }, [])

  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType | null>(disasters[0])

  const handleDisasterSelect = (disaster: DisasterType) => {
    setSelectedDisaster(disaster)
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className='py-2 px-2 bg-white/80 backdrop-blur overflow-y-hidden'>
          <SidebarGroup className='w-full flex flex-col space-y-1'>
            <div className='hidden lg:flex justify-between items-center absolute top-2 left-2 right-2'>
              <Logo/>
            </div>
            <br className='hidden lg:block'/>
            <br className='hidden lg:block'/>
            <div className='flex flex-col gap-2'>
              <span className='flex flex-row items-center gap-1 w-fit bg-blue-500 text-white rounded-xl px-3 text-sm'><Rss className='w-3 h-3 text-white'/> Live Updates</span>
              <Heading as='h1'>
                {disasters.length} Active Disasters 
              </Heading>
            </div>
            <div>
              {disasters && disasters.length > 0 && (
                <p className='text-gray-600 mb-2'>
                  Last Updated: {new Date(disasters[0].lastRefresh).toDateString()}
                </p>
              )}
            </div>
            <Combobox
              list={states}
              category="state"
              onValueChange={(value) => setSelectedState(value)}
            />
          </SidebarGroup>
          <SidebarGroup className='w-full h-full flex flex-col'>
            <Heading as='h2'>Latest</Heading> {selectedState}
            <ScrollArea className='w-full h-full max:h-[600px] flex-col '>
              {disasters?.map((item,index) => (
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
        <div className='flex flex-row justify-between p-[1px]'>
          <SidebarTrigger/>
          <div className='flex flex-row'>
            <Clock/>
            <div className='md:hidden flex justify-between items-center'>
              <Logo/>
            </div>
          </div>
        </div>
        <MapComponent 
          disasters={disasters} 
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}  
        />
        {selectedDisaster != null &&
          <Popup
            onClickOut={()=>setSelectedDisaster(null)}
            disaster={selectedDisaster}
          />
        }
      </main>
    </SidebarProvider>
  );
}


