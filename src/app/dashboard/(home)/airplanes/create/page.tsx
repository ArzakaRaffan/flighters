import { Plane } from 'lucide-react'
import React, { type FC } from 'react'
import AirplaneForm from '../components/form-airplane'

const CreateAirplane: FC = () => {
    return (
        <>
            <div className='flex justify-start p-5'>
                <div className='font-medium font-poppins text-2xl flex flex-row'>
                    <Plane className='mt-1 mr-5'/>Add Airplanes
                </div>
            </div>
            <AirplaneForm type='ADD'/>
        </>

    )
}

export default CreateAirplane

