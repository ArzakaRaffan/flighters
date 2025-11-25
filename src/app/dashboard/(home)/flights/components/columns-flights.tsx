"use client"

import { Button } from "@/components/ui/button"
import type { Airplane, Flight, FlightSeat } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getUrl } from "@/lib/supabase"
import ColumnRouteFlight from "./column-route-flight"
import ColumnSeatPrice from "./column-seat-price"
import DeleteFlight from "./delete-flight"

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

            const planeImageURL = getUrl(flight.plane.image)

            return (
                <div className="flex items-center justify-center ml-8">
                    <div className="relative w-40 h-24 overflow-hidden rounded-md flex-shrink-0 mr-2">
                        <Image
                            src={planeImageURL}
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
        accessorKey: 'departureCity',
        header: 'Route',
        cell: ({ row }) => {
            const flight = row.original

            return <ColumnRouteFlight flight={flight}/>
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const flight = row.original

            return <ColumnSeatPrice flight={flight}/>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const flight = row.original
            return (
                <div className="gap-5 inline-flex items-center">
                    <Button variant="secondary" size="sm" asChild>
						<Link href={`/dashboard/flights/edit/${flight.id}`}>
							<Pencil className="mr-2 h-4 w-4" />
							Edit
						</Link>
					</Button>
                    <DeleteFlight id={flight.id} />
                </div>
            )
        }
    }
]