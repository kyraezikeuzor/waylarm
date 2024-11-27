import { Globe } from 'lucide-react'

export function Logo() {
    return (
        <div className='bg-background/75 backdrop-blur px-2 py-[4px] rounded-md flex items-center space-x-2'>
            <div className='bg-blue-500 p-[2.5px] rounded-sm'>
                <Globe className='text-white w-4 h-4'/>
            </div>
            <span className="text-sm">Waylarm</span>
        </div>
    )
}