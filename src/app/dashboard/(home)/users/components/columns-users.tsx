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

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'passport',
        header: 'passport'
    }
]