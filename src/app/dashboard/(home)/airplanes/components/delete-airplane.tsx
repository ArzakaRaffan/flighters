import { Button } from '@/components/ui/button'
import React, { useActionState, type FC } from 'react'
import { useFormStatus } from 'react-dom'
import { Trash } from 'lucide-react'
import { deleteAirplane } from '../lib/action'
import { ActionResult } from '@/app/dashboard/(auth)/login/form/actions'

interface DeleteAirplaneProps {
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

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
    const deleteAirplaneWithId = deleteAirplane.bind(null, id);
    const [state, formAction] = useActionState(deleteAirplaneWithId, initialFormState)
    return (
        <form action={formAction}>
            <SubmitButton />
        </form>
    )
}



export default DeleteAirplane;
