"use client"

import { ActionResult } from '@/app/dashboard/(auth)/login/form/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import React, { useActionState, type FC } from 'react'
import { useFormStatus } from 'react-dom';
import type { Airplane, Flight } from '@prisma/client';
import { updateFlight } from '../lib/action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveFlight } from '../lib/action';
import { dateFormat } from './column-route-flight';


// interface FormAirplaneProps {
//     type?: "ADD" | "EDIT"
//     defaultValues?: Flight | null
// }

// interface SubmitButtonProps {
//     type?: "ADD" | "EDIT"
// }

interface FlightFormProps {
    airplanes: Airplane[]
    type?: "ADD" | "EDIT"
    defaultValues?: Flight | null
}

const initialFormState: ActionResult = {
    errorTitle: null,
    errorDesc: []
}

const SubmitButton: FC<{ type?: "ADD" | "EDIT" }> = ({ type }) => {
    const { pending } = useFormStatus()
    return (
        <Button className='mt-5' disabled={pending} type="submit">
            {type === "EDIT" ? "Save Changes" : "Add"}
        </Button>
    )
}

export default function FlightForm({ airplanes, defaultValues, type }: FlightFormProps) {

    console.log("Type: ", type)

    const updateFlightWithId = (_state: ActionResult, formData: FormData) => 
        updateFlight(null, defaultValues ? defaultValues.id : null, formData);

    const [state, formAction] = useActionState(
        type == "ADD" ? saveFlight: updateFlightWithId,
        initialFormState)

    console.log(defaultValues)

    return (
        <form action={formAction} className="w-full max-w-screen-xl mx-auto px-4">
            {state.errorTitle && (
                <div className='text-white mx-auto my-4 bg-red-500 p-4 w-[full] rounded-lg flex flex-row items-center'>
                    <div className='font-medium items-center'>
                        {state.errorTitle}
                    </div>
                    <ul className='ml-6 list-disc list-inside font-light'>
                        {state.errorDesc?.map((value, index) => (
                            <li key={index + value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='space-y-2 flex flex-col'>
                    <Label htmlFor='planeId' className='font-light text-sm ml-1'>Choose Airplane</Label>
                    <Select name='planeId' defaultValue={defaultValues?.plane_id || undefined}>
                        <SelectTrigger className="w-[400px] px-4 py-5 mt-2 " id='plane_id'>
                            <SelectValue placeholder="Airplanes" />
                        </SelectTrigger>
                        <SelectContent side='bottom'>
                            {airplanes.map((value) => (
                                <SelectItem key={value.id} value={value.id}>{value.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='space-y-2 flex flex-col mb-2 w-[400px]'>
                    <Label htmlFor='price' className='font-light ml-1 text-sm'>Ticket's base price</Label>
                    <input
                        placeholder='Price ($USD)'
                        name='price'
                        id='price'
                        type='number'
                        required
                        min={0}
                        defaultValue={defaultValues?.price}
                        className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                    <span className='text-xs text-gray-600 ml-3.5'>For Business class there will be an additional of $50 and for First class there will be an additional of $100</span>
                </div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5 gap-y-10'>
                <div className='space-y-2 flex flex-col w-[300px]'>
                    <Label htmlFor='departureCity' className='font-light text-sm ml-1'>Departure City</Label>
                    <input
                        placeholder='City of Departure...'
                        name='departureCity'
                        id='departureCity'
                        required
                        defaultValue={defaultValues?.departureCity}
                        className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>
                <div className='space-y-2 flex flex-col w-[300px]'>
                    <Label htmlFor='departureDate' className='font-light text-sm ml-1'>Departure Time</Label>
                    <input
                        name='departureDate'
                        id='departureDate'
                        type='datetime-local'
                        required
                        defaultValue={dateFormat(defaultValues?.departureDate ?? "", "YYYY-MM-DDTHH:mm")}
                        className='font-extralight mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>
                <div className='space-y-2 flex flex-col w-[300px]'>
                    <Label htmlFor='departureCityCode' className='font-light text-sm ml-1'>Departure City Code</Label>
                    <input
                        placeholder='Departure City Code...'
                        name='departureCityCode'
                        id='departureCityCode'
                        required
                        defaultValue={defaultValues?.departureCityCode}
                        className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>
                <div className='space-y-2 flex flex-col w-[300px]'>
                    <Label htmlFor='destinationCity' className='font-light text-sm ml-1'>Destination City</Label>
                    <input
                        placeholder='City of Destination...'
                        name='destinationCity'
                        id='destinationCity'
                        required
                        defaultValue={defaultValues?.destinationCity}
                        className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>
                <div className='space-y-2 flex flex-col w-[300px]'>
                    <Label htmlFor='arrivalDate' className='font-light text-sm ml-1'>Arrival Time</Label>
                    <input
                        name='arrivalDate'
                        id='arrivalDate'
                        type='datetime-local'
                        required
                        defaultValue={dateFormat(defaultValues?.arrivalDate ?? "", "YYYY-MM-DDTHH:mm")}
                        className='font-extralight mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>
                <div className='space-y-2 flex flex-col w-[300px]'>
                    <Label htmlFor='destinationCityCode' className='font-light text-sm ml-1'>Destination City Code</Label>
                    <input
                        placeholder='Destination City Code...'
                        name='destinationCityCode'
                        id='destinationCityCode'
                        required
                        defaultValue={defaultValues?.destinationCityCode}
                        className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>
            </div>
            <SubmitButton type={type} />
        </form>
    )
}