"use server"

import prisma from "../../../../../../lib/prisma";

export async function getFlights(){
    try{
        const flights = await prisma.flight.findMany({
            include:{
                plane: true,
                seats: true
            },
        })

        return flights
    }catch (error){
        console.log(error)
        return []
    }
}

export async function getFlightById(id: string){
    try{
        const flight = await prisma.flight.findFirst({
            where:{
                id: id
            }
        })
        return flight
    } catch (err){
        console.log(err)
        return null
    }
}