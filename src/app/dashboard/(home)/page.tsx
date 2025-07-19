import { Button } from '@/components/ui/button'
import { Plane } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <>
      <div className='font-bold text-3xl text-center mt-8'>
        Flighters Dashboard
      </div>
      <div className='flex flex-row justify-center mt-5'>
        <Button className='py-7 hover:bg-gray-500 transition-colors duration-500'>
          <Plane className='size-10' />
        </Button>
      </div>
    </>
  )
}
