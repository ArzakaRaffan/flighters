import { Plane } from 'lucide-react'
import React, { type FC } from 'react'
import FlightForm from '../../components/form-flights';
import { getAirplanes } from '../../../airplanes/lib/data';
import { Metadata } from 'next';
import { getFlightById } from '../../lib/data';

type Params = Promise<{
    id: string
}>;

interface EditFlightPageProps {
    params: Params
}

export const metadata: Metadata = {
    title: "Dashboard | Edit data flights",
}

const EditFlightPage: FC<EditFlightPageProps> = async ({ params }) => {
    const airplanes = await getAirplanes();
    const flight = await getFlightById((await params).id)

    console.log((await params).id);

    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 text-2xl font-bold'>Edit Data Flight</div>
            </div>

            <FlightForm airplanes={airplanes} defaultValues={flight} type='EDIT' />

        </div>
    )

}

export default EditFlightPage


