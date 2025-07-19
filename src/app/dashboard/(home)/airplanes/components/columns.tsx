"use client"

import { Button } from "@/components/ui/button"
import { getUrl } from "@/lib/supabase"
import type { Airplane } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"
import Image from 'next/image'
import DeleteAirplane from "./delete-airplane"


export const columns: ColumnDef<Airplane>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const plane = row.original
            return (
                <div className="flex items-center justify-center ml-8">
                    <div className="relative w-40 h-24 overflow-hidden rounded-md flex-shrink-0 mr-2">
                        <Image
                            src={getUrl(plane.image)}
                            alt="Airplane Image"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const plane = row.original

            return <div className="inline-flex gap-5 ml-8">
                <Button
                    variant={"secondary"}
                    size='sm'
                    asChild
                >
                    <Link href={`/dashboard/airplanes/edit/${plane.id}`}>
                        <Pencil />Edit
                    </Link>
                </Button>
                    <DeleteAirplane id={plane.id}/>
            </div>
        }
    }
]