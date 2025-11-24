import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import React, { type FC } from 'react'
import { columns } from './components/columns-flights'
import { DataTable } from '@/components/ui/data-table'
import { getFlights } from './lib/data'


// interface FlightsPageProps {

// }

export const metadata: Metadata = {
    title: "Dashboard | Flights"
}

const FlightsPage: FC = async ({ }) => {

    const data = await getFlights();
    
    return (
        <>
            <div className='flex flex-row items-center justify-between p-5'>
                <div className='font-medium font-poppins text-2xl'>Flights</div>
                <Button className='p-5'>
                    <Link href={'/dashboard/flights/create'} className='flex flex-row items-center gap-1.5'>
                        <Plus /> Add a flight
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </>
    )
}



export default FlightsPage
