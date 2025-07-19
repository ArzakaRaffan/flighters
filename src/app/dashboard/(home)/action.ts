"use server"

import { redirect } from "next/navigation"
import { ActionResult } from "../(auth)/login/form/actions"
import { getUser, lucia } from "@/lib/auth"
import { cookies } from "next/headers"

export async function logout(): Promise<ActionResult> {

    const {session} = await getUser()
    if(!session) {
        return{
            errorTitle: 'Logout Error',
            errorDesc: ['Authorization Error']
        }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie= lucia.createBlankSessionCookie()

    ;(await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/dashboard/login')
}
