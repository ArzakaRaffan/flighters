import React, { FC } from 'react';
import LoginForm from './form';
import { Metadata } from 'next';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface LoginPageProps {

}

export const metadata: Metadata ={
    title: 'Dashboard | Login'
}

const LoginPage = async () => {
    const {user, session} = await getUser()

    if(session && user.role == 'ADMIN'){
        redirect('/dashboard')
    }

    console.log(user)
    return (
        <LoginForm/>
    )
}

export default LoginPage