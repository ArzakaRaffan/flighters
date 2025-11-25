"use server"


import React from 'react'
import prisma from '../../../../../../lib/prisma'

export const getTickets = async () => {
    try{
        const data = await prisma.ticket.findMany({
            include: {
                flight: true,
                customer: true,
                seat: true,
            }
        })

        return data
    }catch (err){
        console.log(err)
        return []
    }
}