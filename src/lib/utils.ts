import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FlightSeat, SeatType } from "@prisma/client"
import { StringOrTemplateHeader } from "@tanstack/react-table"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSeatPerClass = (flightId: string) => {
  const SEAT_CLASS: SeatType[] = ['BUSINESS', 'ECONOMY', 'FIRST']
  const SEAT_CODE  = ["A", "B", "C", "D"]

  const seats: {seatNumber: string, type: SeatType, flightId: string}[] = []

  for(const className of SEAT_CLASS){
    for(const codeName of SEAT_CODE){
      for(let i = 1; i <= 5; i++){
        seats.push({
          seatNumber: `${codeName}${i}`,
          type: className as SeatType,
          flightId: flightId,
        })
      }
    }
  }
  return seats
}


export const seatMapping = (seat: FlightSeat[]) => {
    const totalEconomy = seat.filter(item => item.type === "ECONOMY").length
    const totalBusiness = seat.filter(item => item.type === "BUSINESS").length
    const totalFirst = seat.filter(item => item.type === "FIRST").length

    const economy = seat.filter(item => item.type === "ECONOMY" && !item.isBooked).length
    const business = seat.filter(item => item.type === "BUSINESS" && !item.isBooked).length
    const first = seat.filter(item => item.type === "FIRST" && !item.isBooked).length

    return{
        economy,
        business,
        first,

        totalEconomy,
        totalBusiness,
        totalFirst,
    }
}