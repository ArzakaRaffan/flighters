import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './components/columns'
import { getAirplanes } from './lib/data'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Dashboard | Airplanes"
}

export default async function page() {
    const planes = await getAirplanes();
    return (
        <>
            <div className='flex flex-row items-center justify-between p-5'>
                <div className='font-medium font-poppins text-2xl'>Airplanes</div>
                <Button className='p-5'>
                    <Link href={'/dashboard/airplanes/create'} className='flex flex-row items-center gap-1.5'>
                        <Plus /> Add an Airplane
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={planes}/>
        </>
    )
}
