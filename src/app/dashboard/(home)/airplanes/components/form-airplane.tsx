"use client"

import { ActionResult } from '@/app/dashboard/(auth)/login/form/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import React, { useActionState, type FC } from 'react'
import { useFormStatus } from 'react-dom';
import { addAirplane, editAirplane } from '../lib/action';
import type { Airplane } from '@prisma/client';
import Image from 'next/image'
import { getUrl } from '@/lib/supabase'


interface FormAirplaneProps {
    type?: "ADD" | "EDIT"
    defaultValues?: Airplane | null
}

interface SubmitButtonProps{
    type?: "ADD" | "EDIT"
}

const initialFormState: ActionResult = {
    errorTitle: null,
    errorDesc: []
}

const SubmitButton: FC<SubmitButtonProps> = ({type}) => {
    const { pending } = useFormStatus()
    return (
        <div className="flex justify-center">
            <Button disabled={pending} type="submit" className="px-15 py-5 mt-15">
                {type == 'ADD'? 'ADD' : "EDIT"}
            </Button>
        </div>
    )
}


const AirplaneForm: FC<FormAirplaneProps> = ({ type, defaultValues }) => {
    const editAirplaneWithId = (_state: ActionResult, formData: FormData) => editAirplane(null, formData, defaultValues?.id!!)
    const [state, formAction] = useActionState(type === "ADD" ? addAirplane : editAirplaneWithId, initialFormState)
    return (
        <form className='w-[100%]' action={formAction}>
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
            <div className='flex flex-row gap-12 ml-5 items-center row-end-2 mt-4'>
                <div className='space-y-5 w-[45%]'>
                    <Label htmlFor='code' className='font-light'>Airplane's Code</Label>
                    <input
                        placeholder='Code...'
                        name='code'
                        id='code'
                        required
                        defaultValue={defaultValues?.code}
                        className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>

                <div className='space-y-2 w-[45%]'>
                    <Label htmlFor='name' className='font-light'>Airplane's Name</Label>
                    <input
                        placeholder='Name...'
                        name='name'
                        id='name'
                        required
                        defaultValue={defaultValues?.name}
                        className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-grayring-gray-700 transition duration-200'
                    />
                </div>
            </div>

            {defaultValues?.image && (
                <div className="mb-4 flex justify-center mt-8">
                    <Image
                        src={getUrl(defaultValues.image)}
                        alt="Current Airplane Image"
                        width={200}
                        height={120}
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                        priority
                    />
                </div>
            )}

            <div className='w-full flex justify-center mt-10'>
                <div className='space-y-2 w-[45%] text-center '>
                    <Label htmlFor='name' className='font-light'>{type === 'ADD' ? "Airplane's Image" : "Change Airplane's Image (Optional)"}</Label>
                    <input
                        type='file'
                        name='image'
                        id='image'
                        required={type==="ADD"}
                        className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 transition duration-200'
                    />
                </div>
            </div>
            <SubmitButton type={type} />
        </form>
    )
}

export default AirplaneForm;
