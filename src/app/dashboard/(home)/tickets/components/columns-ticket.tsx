"use client"

import type { FlightSeat, Flight, Ticket, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import ColumnRouteFlight from "../../flights/components/column-route-flight";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TicketType = Ticket & {
    flight: Flight,
    customer: User,
    seat: FlightSeat,
}

export const columns: ColumnDef<TicketType>[] = [
    {
        accessorKey: 'customerId',
        header: "Passanger's Name",
        cell: ({row}) => {
            const ticket = row.original

            return (
                <div className="text-center">
                    {ticket.customer.username}
                </div>
            )
        }
    },

    {
        accessorKey: 'flightid',
        header: "Flight Detail",
        cell: ({row}) => {
            const ticket = row.original

            return <ColumnRouteFlight flight={ticket.flight}/>
        }
    },
    {
        accessorKey: 'seatId',
        header: 'Seat Number',
        cell: ({row}) => {
            const ticket = row.original

            return <Badge>{ticket.seat.seatNumber}</Badge>
        }
    },
    {
        id:'status_transaction',
        header: 'Status Transaksi',
        cell: ({row}) => {
            const ticket = row.original

            return (
                <div className="space-y-1">
                    <Badge className={cn(
                        ticket.status === "SUCCESS"
                        ? "bg-green-500"
                        : ticket.status === "PENDING"
                        ? "bg-yellow-500":
                        "bg-red-500"
                    )}>
                        {ticket.status}
                    </Badge>
                </div>
            )
        }
    }

    

]