'use client'
import React, { useState, useEffect } from 'react'
import { DisasterType } from '@/types'

import lodash from 'lodash'

export const Select = (    
    {children, disaster, selectedDisaster, onSelect, onDeselect, selectedClassName}:
    {children?:React.ReactNode, disaster: DisasterType, selectedDisaster: DisasterType | null, onSelect: () => void, onDeselect: () => void, selectedClassName:string}
) => {
     
    const [click, setClick] = useState(false)
    
    useEffect(()=>{
        const handleSelect = () => {
            
            if (selectedDisaster == null || lodash.isEqual(selectedDisaster, disaster) == false) {
                onSelect()
                //console.log(`Selected ${selectedLocation?.school}`)
            } else if (lodash.isEqual(selectedDisaster, disaster) == true) {
                onDeselect()
                console.log(`Deselected ${selectedDisaster.declarationTitle}`)
            }
        }
        handleSelect()
    },[click])

    return (
        <div 
        className={`w-full h-full hover:cursor-pointer hover:opacity-75
            ${lodash.isEqual(selectedDisaster, disaster) == true && selectedClassName}
            ${lodash.isEqual(selectedDisaster, disaster) == false && ''}`
        } 
        onClick={()=>setClick(!click)}
        >
            {children}
        </div>
    )
}