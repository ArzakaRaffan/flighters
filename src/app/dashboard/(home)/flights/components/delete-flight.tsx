import { Button } from '@/components/ui/button'
import React, { useActionState, type FC } from 'react'
import { useFormStatus } from 'react-dom'
import { Trash } from 'lucide-react'
import { ActionResult } from '@/app/dashboard/(auth)/login/form/actions'
import { deleteFlight } from '../lib/action'

interface DeleteFlightProps {
    id: string
}

const initialFormState: ActionResult = {
    errorTitle: null,
    errorDesc: []
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} type='submit' variant={'destructive'} size='sm' className="cursor-pointer">
            <Trash className='h-4' />
            Delete
        </Button>
    )
}

const DeleteFlight: FC<DeleteFlightProps> = ({ id }) => {
    const deleteFlightWithId = deleteFlight.bind(null, id);
    return (
        <form action={deleteFlightWithId}>
            <SubmitButton />
        </form>
    )
}



export default DeleteFlight;
