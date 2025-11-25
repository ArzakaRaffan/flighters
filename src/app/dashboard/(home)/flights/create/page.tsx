import { PlaneTakeoff } from 'lucide-react'
import { Metadata } from 'next'
import React, {type FC } from 'react'
import FlightForm from '../components/form-flights'
import { getAirplanes } from '../../airplanes/lib/data'
import { ActionResult } from '@/app/dashboard/(auth)/login/form/actions'

export const metadata: Metadata ={
    title: 'Dashboard | Add Flight'
}

const CreateFlightPage: FC = async () => {
    const airplanes = await getAirplanes()

    return (
        <>
            <div className='flex justify-start p-5'>
                <div className='font-medium font-poppins text-2xl flex flex-row'>
                    <PlaneTakeoff className='mt-1 mr-5' />Add Flight
                </div>
            </div>
            <FlightForm airplanes={airplanes} type='ADD'/>
        </>
    )
}

export default CreateFlightPage
