import { Globe } from 'lucide-react'

export function Logo() {
    return (
        <div className='flex items-center space-x-2'>
            <div className='bg-blue-500 p-[2.5px] rounded-sm'>
                <Globe className='text-white w-4 h-4'/>
            </div>
            <span className="text-sm text-gray-600">Waylarm</span>
        </div>
    )
}