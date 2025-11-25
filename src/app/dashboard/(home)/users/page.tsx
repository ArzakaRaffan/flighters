import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import type { Metadata } from 'next'
import { columns } from './components/columns-users'
import { getCustomers } from './lib/action'


export const metadata: Metadata = {
    title: "Dashboard | Users"
}

export default async function UsersPage() {

    const users = await getCustomers()
    return (
        <>
            <div className='flex flex-row items-center justify-between p-5'>
                <div className='font-medium font-poppins text-2xl'>Users</div>
            </div>
            <DataTable columns={columns} data={users}/>
        </>
    )
}
