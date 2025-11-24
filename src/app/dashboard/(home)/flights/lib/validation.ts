import { z } from "zod";

export const formFlightSchema = z.object({
    planeId: z.string({required_error: 'Plane cannot be empty'}),
    price: z.string({required_error: "Ticket's price cannot be empty"}),
    departureCity: z.string({required_error: "Departure city cannot be empty"}),
    departureDate: z.date(),
    departureCityCode: z.string({
        required_error: "Departure city code cannot be empty"
    }).min(3, {
        message: "Departure city code must have only 3 words"
    }).max(3,{
        message: "Departure city code must have only 3 words"
    }).regex(/^[A-Z]{3}$/, "Departure city code's format is [XXX]"),
    destinationCity: z.string({required_error: "Destination city cannot be empty"}),
    arrivalDate: z.date(),
    destinationCityCode: z.string({
        required_error: "Destination city code cannot be empty"
    }).min(3, {
        message: "Destination city code must have only 3 words"
    }).max(3,{
        message: "Destination city code must have only 3 words"
    }).regex(/^[A-Z]{3}$/, "Destination city code's format is [XXX]"),

})