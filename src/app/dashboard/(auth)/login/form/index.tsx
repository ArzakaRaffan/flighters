"use client"

import React, { FC } from 'react';
import { ActionResult, handleSignIn } from './actions'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom';

interface LoginFormProps {

}
var pendingStatus = false
const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} type='submit' className='bg-gray-300 text-black rounded-md w-full h-full px-6 py-3 hover:bg-gray-400 transition-colors duration-400'>
            {pending ? 'Loading...' : 'Submit'}
        </Button>
    )
}

const initialFormState: ActionResult = {
    errorTitle: null,
    errorDesc: []
}

const LoginForm: FC<LoginFormProps> = ({ }) => {
    const [state, formAction] = useActionState(handleSignIn, initialFormState)

    if (state.errorTitle) {
        console.log("Form state:", state)
    }

    return (
        <div className='w-full h-screen bg-gray-900'>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm mb-2'>
                    <h2 className='text-center text-2xl font-semibold leading-9 tracking-tight text-emerald-100'>
                        Login to your account now.
                    </h2>
                </div>
                {state.errorTitle && (
                    <div className='text-white mx-auto my-4 bg-red-500 p-4 w-[375px] rounded-lg'>
                        <div className='font-medium mb-2'>
                            {state.errorTitle}
                        </div>
                        <ul className='list-disc list-inside'>
                            {state.errorDesc?.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form action={formAction} className='bg-white flex flex-col gap-5 p-4 rounded-lg px-6 py-6'>
                        <input disabled={pendingStatus}
                            type='email'
                            name='email'
                            placeholder='example@example.com'
                            className='px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 hover:ring-1 hover:ring-gray-300 transition-colors duration-40'
                            required
                        />
                        <input
                            disabled={pendingStatus}
                            type='password'
                            name='password'
                            placeholder='***********'
                            className='px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 hover:ring-1 hover:ring-gray-300 transition-colors duration-400'
                            required
                        />
                        <SubmitButton />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default LoginForm;