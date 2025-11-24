"use server"

import { ActionResult } from "@/app/dashboard/(auth)/login/form/actions"
import { redirect } from "next/navigation"
import { formFlightSchema } from "./validation"
import prisma from "../../../../../../lib/prisma";
import { number } from "zod/v4";
import { generateSeatPerClass } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function saveFlight(
    prevstate: unknown,
    formData: FormData
): Promise<ActionResult> {
    const departureDate = new Date(formData.get('departureDate') as string)
    const arrivalDate = new Date(formData.get('arrivalDate') as string)

    const validate = formFlightSchema.safeParse({
        planeId: formData.get("planeId"),
        price: formData.get("price"),
        departureCity: formData.get("departureCity"),
        departureDate,
        departureCityCode: formData.get("departureCityCode"),
        destinationCity: formData.get("destinationCity"),
        destinationCityCode: formData.get("destinationCityCode"),
        arrivalDate,
    }
    )

    if (!validate.success) {
        const errorDesc = validate.error.issues.map((issue) => issue.message)

        return {
            errorTitle: "Error Validation",
            errorDesc: errorDesc
        }
    }

    try {
        const data = await prisma.flight.create({
            data: {
                price: Number(validate.data.price),

                departureDate: validate.data.departureDate,
                arrivalDate: validate.data.arrivalDate,

                departureCity: validate.data.departureCity,
                departureCityCode: validate.data.departureCityCode,

                destinationCity: validate.data.destinationCity,
                destinationCityCode: validate.data.destinationCityCode,

                plane: {
                    connect: { id: validate.data.planeId }
                }
            }

        })

        console.log(data.id)
        const seats = generateSeatPerClass(data.id)

        await prisma.flightSeat.createMany({
            data: seats
        })

    } catch (error: any) {
        console.error("Prisma Error:", error);

        return {
            errorTitle: "Inserting Error",
            errorDesc: [error?.message ?? "Unknown error"]
        }
    }

    revalidatePath('/dashboard/flights/create')
    redirect('/dashboard/flights')
}
