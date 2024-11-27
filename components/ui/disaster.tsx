'use client'
import React from 'react'
import { Calendar } from 'lucide-react'

import { DisasterType } from '@/types'

import { formatDeclarationTitle } from '@/lib/utils'

import { Select } from './select'

interface DisasterProps {
  disaster: DisasterType,
  selectedDisaster: DisasterType | null, 
  onSelect: () => void, 
  onDeselect: () => void
}

export function Disaster(
    { disaster, selectedDisaster, onSelect, onDeselect }: DisasterProps) 
{

  return (
    <Select 
    disaster={disaster}
    selectedDisaster={selectedDisaster}
    onSelect={onSelect}
    onDeselect={onDeselect}
    selectedClassName='border-[3px] py-1 border-blue-400 rounded-xl shadow-sm bg-background'
    >
        <div className='h-fit flex flex-row items-center gap-3 px-2 py-2 border-b border-border '>
            <div>
                <span className=''>{disaster.state}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm flex flex-row items-center gap-1'>
                    <Calendar className='w-3'/> {new Date(disaster.declarationDate).toDateString()}
                    <span className='bg-red-500 text-white font-medium rounded-lg px-2 text-xs flex flex-row items-center gap-1'>
                        {disaster.incidentType}
                    </span>
                </span>
                <span className='font-semibold'>
                    {formatDeclarationTitle(disaster.declarationTitle)}
                </span>
                <span className='text-sm'>
                    {disaster.designatedArea}
                </span>
            </div>
        </div>
    </Select>
  )
}
