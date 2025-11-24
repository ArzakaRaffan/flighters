"use client"

import { Button } from "@/components/ui/button"
import type { Airplane, Flight, FlightSeat } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"

export type FlightColumn = Flight & {
    plane: Airplane,
    seats: FlightSeat[]
}

export const columns: ColumnDef<FlightColumn>[] = [
    {
        accessorKey: 'plane_id',
        header: 'Airplane',
        cell: ({ row }) => {
            const flight = row.original

            return flight.plane_id
        }
    },
    {
        accessorKey: 'departureCity',
        header: 'Route',
        cell: ({ row }) => {
            const flight = row.original

            return flight.departureCityCode
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const flight = row.original

            return flight.price
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const flight = row.original

            return (
                <div className="gap-5 inline-flex items-center">
                    <Button variant={"secondary"} size={"sm"} asChild>
                        <Link href={`/dashboard/airplanes/edit/${flight.id}`}>
                            <Pencil />Edit
                        </Link>
                    </Button>
                </div>
            )
        }
    }
]