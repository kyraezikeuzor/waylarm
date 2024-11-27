'use client'

import React, {useState, useEffect} from 'react'
import { Sun, Moon } from 'lucide-react'

export const Theme = () => {

    const [showDarkMode, setShowDarkMode] = useState(false)

    useEffect(()=>{
        document.documentElement.classList.toggle('dark', showDarkMode);
    }, [showDarkMode])

    useEffect(()=>{
        const data = window.localStorage.getItem('WAYLARM_APP_THEME');
        if (data != null) setShowDarkMode(JSON.parse(data))
    },[])

    useEffect(()=>{
        window.localStorage.setItem('WAYLARM_APP_THEME', JSON.stringify(showDarkMode))
    }, [showDarkMode])

    const changeTheme = () => {
        setShowDarkMode(prevMode => !prevMode)
    }
    
    return (
        <div onClick={changeTheme} className='w-8 h-8 bg-background/75 backdrop-blur z-[9999] flex flex-col items-center justify-center border border-border rounded-full shadow-lg cursor-pointer'>
            {showDarkMode ? <Sun className='w-6 h-6'/> : <Moon className='w-6 h-6'/>}
        </div>
    )
}