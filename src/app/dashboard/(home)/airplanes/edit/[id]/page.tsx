import { Plane } from 'lucide-react'
import React from 'react'
import AirplaneForm from '../../components/form-airplane'
import { getAirplaneById } from '../../lib/action'

type Params = Promise<{
    id: string
}>;

export default async function Challenge(props: { params: Params }) {
    const { id } = await props.params
    const data = await getAirplaneById(id)

    return (
        <>
            <div className='flex justify-start p-5'>
                <div className='font-medium font-poppins text-2xl flex flex-row'>
                    <Plane className='mt-1 mr-5' />
                    Edit Airplane
                </div>
            </div>
            <AirplaneForm type='EDIT' defaultValues={data} />
        </>
    )
}



