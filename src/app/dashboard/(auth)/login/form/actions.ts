"use server"
import prisma from "../../../../../../lib/prisma"
import { formSchema } from "./validation"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"

export interface ActionResult {
    errorTitle: string | null
    errorDesc: string[] | null
}

export async function handleSignIn(prevState: any, formData: FormData): Promise<ActionResult> {
    const value = formSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if(!value.success){
        const errorDesc = value.error.issues.map((issue) => issue.message)

        return{
            errorTitle: 'Error Validation',
            errorDesc
        }
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: value.data.email
        }
    })

    if(!existingUser){
        return {
            errorTitle: 'User Not Found',
            errorDesc: ['Unregistered Email.']
        }
    }

    const passwordMatch = await bcrypt.compareSync(value.data.password, existingUser.password)
    if(!passwordMatch){
        return {
            errorTitle: 'Invalid Credentials',
            errorDesc: ['Wrong email or password.']
        }
    }

    const session = await lucia.createSession(existingUser.id, {})

    const sessionCookie = await lucia.createSessionCookie(session.id)

    ;(await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/dashboard')
}