import React from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from "next/link";
import { logout } from '../action';


const LogoutButton = () => {
    return (
        <div className="space-y-2 border-b-2 rounded-lg">
            <Button
                variant={"destructive"}
                asChild
                onClick={logout}
                className="w-full justify-start p-6"
            >
                <Link href={"/dashboard/login"}>
                    <div className="flex flex-row items-center gap-3 justify-center">
                        <LogOut className="" /> Log Out
                    </div>
                </Link>
            </Button>
        </div>
    )
}

export default LogoutButton;
